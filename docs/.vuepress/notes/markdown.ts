import { defineCollection } from "vuepress-theme-plume";

export default defineCollection({
  dir: "markdown",
  sidebar: [
    {
      text: "markdown",
      collapsed: false,
      link: "/markdown/",
      items: [
        "markdown基础",
      ],
    },
  ],
  title: 'markdown',
  type: "doc",
});
