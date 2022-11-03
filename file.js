import fs from "fs";

/**
 * 写文件
 * @param {*} fileName
 * @param {*} fileContent
 * @returns
 */
const writeFile = (fileName, fileContent) =>
  new Promise((resolve, reject) => {
    fs.writeFile(fileName, fileContent, error => {
      if (error) {
        console.log(`writeFile ${fileName} failure`, error);
        reject(error);
      } else {
        console.log(`writeFile ${fileName} success`);
        resolve();
      }
    });
  });

/**
 * 读文件
 * @param {*} fileName
 * @returns
 */
const readFile = fileName =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, data) => {
      if (error) {
        console.log(`readFile ${fileName} failure`, error);
        reject(error);
      } else {
        console.log("readFile ${fileName} success");
        resolve(data.toString());
      }
    });
  });

export default {
  writeFile,
  readFile
};
