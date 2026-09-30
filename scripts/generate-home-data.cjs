const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(ROOT, "docs");
const NOTES_CONFIG_DIR = path.join(DOCS_DIR, ".vuepress", "notes");
// 移除 PUBLIC_DIR 变量，不再使用
const OUTPUT_FILE = path.join(DOCS_DIR, ".vuepress/src/generated/home-data.json");

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

// 递归遍历md文件
function walkMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

// 日期标准化
function normalizeDate(value) {
  if (!value) return null;
  const normalized = typeof value === "string" ? value.trim().replace(/\//g, "-") : value;
  const date = normalized instanceof Date ? normalized : new Date(normalized);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

// 获取文件git提交时间
function getGitDate(filePath) {
  try {
    const relativePath = path.relative(ROOT, filePath);
    const output = execFileSync("git", ["log", "-1", "--format=%aI", "--", relativePath], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return output || null;
  } catch {
    return null;
  }
}

// 优先级：frontmatter.createTime > date > lastUpdated > git时间 > 文件修改时间
function resolveItemDate(filePath, frontmatter) {
  return (
    normalizeDate(frontmatter.createTime) ||
    normalizeDate(frontmatter.date) ||
    normalizeDate(frontmatter.lastUpdated) ||
    normalizeDate(getGitDate(filePath)) ||
    normalizeDate(fs.statSync(filePath).mtime)
  );
}

// 去除markdown标记、公式、图片链接
function stripMarkdown(content) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$[^$\n]+\$/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^:::+.*$/gm, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~`>|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text, maxLength = 88) {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
}

// 提取文章标题
function extractTitle(content, filePath) {
  const heading = content.match(/^#\s+(.+)$/m);
  if (heading) return heading[1].trim();
  return path.basename(filePath, ".md");
}

// 生成页面链接
function defaultPermalink(filePath) {
  const relativePath = path.relative(DOCS_DIR, filePath).replace(/\\/g, "/");
  const noExtension = relativePath.replace(/\.md$/, "");
  if (noExtension.endsWith("/README")) {
    return `/${noExtension.replace(/\/README$/, "/")}`;
  }
  return `/${noExtension}/`;
}

function getExcerpt(content) {
  return truncate(stripMarkdown(content));
}

// 读取 .vuepress/notes 下所有文集配置（YOLO.ts、markdown.ts）
function readNoteCollections() {
  const files = fs
    .readdirSync(NOTES_CONFIG_DIR)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts");

  return files
    .map((file) => {
      const source = readText(path.join(NOTES_CONFIG_DIR, file));
      const dir = source.match(/dir:\s*["']([^"']+)["']/)?.[1];
      const title = source.match(/title:\s*["']([^"']+)["']/)?.[1];
      if (!dir || !title) return null;
      return { dir, title, path: `/${dir}/` };
    })
    .filter(Boolean);
}

// 收集所有学习笔记（YOLO + markdown）
function collectLatestNote() {
  const collections = readNoteCollections();
  const noteItems = [];

  for (const collection of collections) {
    const dirPath = path.join(DOCS_DIR, collection.dir);
    const files = walkMarkdownFiles(dirPath).filter((filePath) => path.basename(filePath) !== "README.md");
    for (const filePath of files) {
      const raw = readText(filePath);
      const { data, content } = matter(raw);
      noteItems.push({
        path: data.permalink || defaultPermalink(filePath),
        title: data.title || extractTitle(content, filePath),
        excerpt: getExcerpt(content),
        isoDate: resolveItemDate(filePath, data),
        collectionTitle: collection.title,
        collectionPath: collection.path,
      });
    }
  }
  noteItems.sort((a, b) => Date.parse(b.isoDate) - Date.parse(a.isoDate));
  return {
    count: noteItems.length,
    latest: noteItems[0] || null,
  };
}

// 收集博客文章
function collectLatestPost() {
  const files = walkMarkdownFiles(path.join(DOCS_DIR, "blog")).filter((filePath) => path.basename(filePath) !== "README.md");
  const posts = files
    .map((filePath) => {
      const raw = readText(filePath);
      const { data, content } = matter(raw);
      const sectionName = path.basename(path.dirname(filePath));
      if (data.draft === true) return null;
      return {
        path: data.permalink || defaultPermalink(filePath),
        title: data.title || extractTitle(content, filePath),
        excerpt: data.excerpt || getExcerpt(content),
        isoDate: resolveItemDate(filePath, data),
        section: sectionName,
        tags: Array.isArray(data.tags) ? data.tags.slice(0, 3) : [],
      };
    })
    .filter(Boolean);
  posts.sort((a, b) => Date.parse(b.isoDate) - Date.parse(a.isoDate));
  return {
    count: posts.length,
    latest: posts[0] || null,
  };
}

function main() {
  const notes = collectLatestNote();
  const posts = collectLatestPost();
  const payload = {
    generatedAt: new Date().toISOString(),
    counts: {
      notes: notes.count,
      posts: posts.count,
    },
    latest: {
      note: notes.latest,
      post: posts.latest,
    },
  };
  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Successfully saved homepage data to ${OUTPUT_FILE}`);
}

main();
