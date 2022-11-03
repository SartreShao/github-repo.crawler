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
 * @param {*} html
 */
const parse = html => {
  openLog ? console.log(`start parse html`) : {};
};

/**
 * 解析网站成功
 * @param {*} result
 */
const success = result => {
  openLog ? console.log(`parse html success:`, result) : {};
};

export default { start, downloaded, parse, success };
