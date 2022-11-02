import axios from "axios";
import cheerio from "cheerio";

console.log("fuck");
axios.get("https://github.com/SartreShao?tab=repositories").then(res => {
  console.log("shit");
  console.log(res);
});

/**
 * 网页下载器
 * @param {*} url
 * @returns
 */
const downloadHTML = async url => {
  const html = await axios.get(url);
  console.log(`${url}`);
  return html;
};

const Log = {
  start: url => {
    console.log("start");
  }
};
