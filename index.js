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
  const result = await axios.get(url);
  const html = result.data;
  Log.downloaded(url, html);
  return html;
};

/**
 * 网站解析器
 * @param {*} cheerio
 * @returns
 */
const parse = (html, parseFunction) => {
  Log.parse(html);
  const $ = cheerio.load(html);
  const result = parseFunction($);
  Log.success(result);
  return result;
};

/**
 * 解析 GithubRepo
 * @param {*} html
 * @returns
 */
const parseGithubRepo = html =>
  parse(html, $ => {
    const list = $("#user-repositories-list li");
    const repos = [];
    for (let i = 0; i < list.length; i++) {
      const li = list.eq(i);
      const repo = {
        repoName: li.find("h3").text().trim(),
        repoUrl: li.find("h3 a").attr("href").trim(),
        repoDesc: li.find("p").text().trim(),
        language: li.find("[itemprop=programmingLanguage]").text().trim(),
        star: li.find(".muted-link.mr-3").eq(0).text().trim(),
        fork: li.find(".muted-link.mr-3").eq(1).text().trim(),
        forkedFrom: li.find(".f6.text-gray.mb-1 a").text().trim()
      };
      repos.push(repo);
    }
    return repos;
  });

/**
 * 主函数入口
 */
const main = async () => {
  try {
    // 下载网页
    const html = await downloadHTML(
      "https://github.com/SartreShao?tab=repositories"
    );

    // 解析网页
    const result = parseGithubRepo(html);

    // 输出结果
    console.log("result", result);
  } catch (error) {
    console.log(error);
  }
};

main();
