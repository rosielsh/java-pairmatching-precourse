import { promises as fs } from "fs";

export const getDataFromFile = async (folderName, fileName) => {
  try {
    const rootPath = process.cwd();
    const fullPath = [rootPath, folderName, fileName].join("/");
    return await fs.readFile(fullPath, "utf-8");
  } catch (error) {
    throw new Error(`${fileName} 파일을 불러올 수 없습니다. 파일 경로를 확인해주세요.`, error);
  }
};