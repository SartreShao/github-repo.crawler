import Crawler from "./crawler";
import Parse from "./parse";

/**
 * 抓取单页 GithubRepo 的数据
 * @param {*} githubRepoUrl
 * @returns
 */
const crawlerGithubRepo = async githubRepoUrl => {
  // 下载网页
  const html = await Crawler.downloadHTML(githubRepoUrl);

  // 解析网页
  const result = Crawler.parseHTML(html, $ => {
    const liList = $("#user-repositories-list li");
    const repos = [];
    for (let i = 0; i < liList.length; i++) {
      const li = liList.eq(i);
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

  return result;
};

/**
 * 主函数入口
 */
const main = async () => {
  crawlerGithubRepo("https://github.com/SartreShao?tab=repositories");
};

main();
