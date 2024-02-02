"server-side";

import path from "path";
import fs from "fs";
import React from "react";

export const convertImagePathToFile = async (
  imagePath: string
): Promise<File> => {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  const file = new File([blob], "image.jpg", { type: "image/jpeg" });
  return file;
};

// export const convertVideoPathToFile = (videoPath: string): File => {
//   const filePath = path.resolve(videoPath);
//   const fileData = fs.readFileSync(filePath);
//   const file = new File([fileData], "video.mp4", { type: "video/mp4" });
//   return file;
// };
