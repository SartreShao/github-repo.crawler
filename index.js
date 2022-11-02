import axios from "axios";
import cheerio from "cheerio";
import Log from "./log.js";

/**
 * 网页下载器
 * @param {*} url
 * @returns
 */
const downloadHTML = async url => {
  Log.start(url);
  const html = await axios.get(url);
  Log.downloaded(url, html);
  return html;
};

// 下载网页
await downloadHTML("https://github.com/SartreShao?tab=repositories");
