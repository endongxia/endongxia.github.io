import { defineCollections } from "vuepress-theme-plume";
import markdown from "./markdown.ts";
import YOLO from "./YOLO.ts";


export const notes = defineCollections([
	markdown,
	YOLO,
	
]);
