// 用于控制 Log 打印
const openLog = true;

/**
 * 开始下载网页
 * @param {} url
 */
const start = url => {
  openLog ? console.log(`start download html: ${url} `) : {};
};

/**
 * 下载网页成功
 * @param {*} url
 */
const downloaded = (url, html) => {
  openLog ? console.log(`download html success: ${url} `) : {};
};

/**
 * 开始解析网页
 * @param {*} url
 */
const parse = (url, html) => {
  openLog ? console.log(`start parse html: ${url} `) : {};
};

/**
 * 解析网站成功
 * @param {*} url
 * @param {*} json
 */
const success = (url, result) => {
  openLog ? console.log(`parse html success: ${url}, result: ${result}`) : {};
};

export default { start, downloaded, parse, success };
