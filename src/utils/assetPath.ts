/**
 * @param type 
 * @param filename
 * @returns
 */
export const assetPath = (type: "js" | "plugins" | "images" | "css" | "images" | "icons" | "videos" | "scss", filename: string): string =>
  `/assets/${type}/${filename}`;