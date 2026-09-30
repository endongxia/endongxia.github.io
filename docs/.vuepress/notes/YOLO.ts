import { defineCollection } from "vuepress-theme-plume";

export default defineCollection({
  dir: "YOLO",
  sidebar: [
    {
      text: "YOLO",
      collapsed: false,
      link: "/YOLO/",
      items: [
        "基于YOLO模型的路面交通标志检测研究",
      ],
    },
  ],
  title: 'YOLO',
  type: "doc",
});
