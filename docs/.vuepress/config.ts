/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 *
 * 请注意，对此文件的修改都会重启 vuepress 服务。
 * 部分配置项的更新没有必要重启 vuepress 服务，建议请在 `.vuepress/config.ts` 文件中配置
 *
 * 特别的，请不要在两个配置文件中重复配置相同的项，当前文件的配置项会被覆盖
 */

import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { notes } from './notes/index.ts'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Endong Xia',
  description: '',
  
head: [
    // 配置站点图标
    ['link', { rel: 'icon', type: 'image/jpg', href: 'images/peipei.png' }],
    ['link', { rel: 'preload', as: 'style', href: '/fonts/LXGWBrightGB-Regular/result.css' }],
    ['link', { rel: 'stylesheet', type:'text/css', href: '/fonts/LXGWBrightGB-Regular/result.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css', integrity: 'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X', crossorigin: 'anonymous' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js', integrity: 'sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4', crossorigin: 'anonymous' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js', integrity: 'sha384-mll67QQFJfxn0IYznZYonOWZ644AWYC+Pt2cHqMaRhXVrursRwvLnLaebdGIlYNa', crossorigin: 'anonymous' }],
    ['script', { src: 'https://app.rybbit.io/api/script.js', 'data-site-id': '1153' }, 'defer'],
    
    
  ],

  bundler: viteBundler(),
  shouldPrefetch: false,

  theme: plumeTheme({
    collections: [
      {
        type: 'post', // 替代原博客功能
        dir: 'blog', // 指向 docs/blog 目录
        title: '博客', // 集合显示名称
        postList: true, // 是否启用文章列表页
        tags: true, // 是否启用标签页
        archives: true, // 是否启用归档页
        categories: true, // 是否启用分类页
        postCover: 'left', // 文章封面位置
        pagination: 10, // 每页显示文章数量
      },
      ...notes,
    ],
  })
})
