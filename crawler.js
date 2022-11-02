import axios from "axios";
import cheerio from "cheerio";
import Log from "./log";

/**
 * 网页下载器
 * @param {*} url
 * @returns
 */
const downloadHTML = async url => {
  Log.start(url);
  const result = await axios.get(url);
  const html = result.data;
  Log.downloaded(url, html);
  return html;
};

/**
 * 网页解析器
 * @param {*} cheerio
 * @returns
 */
const parseHTML = (html, parseFunction) => {
  Log.parse(html);
  const $ = cheerio.load(html);
  const result = parseFunction($);
  Log.success(result);
  return result;
};

export default { downloadHTML, parseHTML };
