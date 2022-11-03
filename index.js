import Crawler from "./crawler.js";
import File from "./file.js";

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
  // crawlerGithubRepo("https://github.com/SartreShao?tab=repositories");

  // const html = await Crawler.downloadHTML(
  //   "https://www.google.com/search?q=%22stuart+mckeown%22+inurl%3Alinkedin.com+OR+inurl%3Aangel.co+OR+inurl%3Atwitter.com+OR+inurl%3Afacebook.com+OR+inurl%3Ainstagram.com&sxsrf=ALiCzsaV0MrGmsHKeSPW-o4dewgDbkMDwQ%3A1667382742190&source=hp&ei=1j1iY4niCIy-wAOwkLTwAg&iflsig=AJiK0e8AAAAAY2JL5u9K78ezb9OmRG6PT4Vb7Og-s9I6&ved=0ahUKEwiJpbPgnI_7AhUMH3AKHTAIDS4Q4dUDCAs&uact=5&oq=%22stuart+mckeown%22+inurl%3Alinkedin.com+OR+inurl%3Aangel.co+OR+inurl%3Atwitter.com+OR+inurl%3Afacebook.com+OR+inurl%3Ainstagram.com&gs_lcp=Cgdnd3Mtd2l6EANQAFgAYKoKaABwAHgAgAEAiAEAkgEAmAEAoAECoAEB&sclient=gws-wiz"
  // );

  const html = await File.readFile("google_serach_result.html");

  const result = Crawler.parseHTML(html, $ => {
    console.log("start");
    const elementList = $(".Gx5Zad.fP1Qef.xpd.EtOod.pkphOe");
    const resultList = [];
    for (let i = 0; i < elementList.length; i++) {
      const element = elementList.eq(i);
      resultList.push({
        url: element
          .find("a")
          .attr("href")
          .trim()
          .match(/\/url\?q=(.*)&sa/)[1]
      });
    }

    console.log("resultList", resultList);
  });

  // const html = await Crawler.downloadHTML("http://www.google.com");

  // const html = await Crawler.downloadHTML(
  //   "https://www.baidu.com/s?wd=hupu&rsv_spt=1&rsv_iqid=0xece371120000edd3&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&rqlang=&tn=baiduhome_pg&ch="
  // );

  // console.log("html", html);
};

try {
  main();
} catch (error) {
  console.log("error", error.message);
}
