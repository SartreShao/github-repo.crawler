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
  const result = await axios.get(url, {
    proxy: {
      protocol: "http",
      host: "127.0.0.1",
      port: 7890
      // auth: {
      //   username: "mikeymike",
      //   password: "rapunz3l"
      // }
    }
  });
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
