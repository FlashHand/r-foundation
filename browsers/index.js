/**
 * @Description Browser type-check
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/7/24 10:34 AM
 */
let userAgent = 'Not a real browser!';
if (typeof navigator !== "undefined" && navigator.userAgent) {
  userAgent = navigator.userAgent;
} else {
  console.error(userAgent);
}
const isSafari = () => {
  return userAgent.indexOf("Safari") > -1;
};
const isChrome = () => {
  return userAgent.indexOf("Chrome") > -1;
};
const isEdge = () => {
  return userAgent.indexOf("Edge") > -1;
};
const isFirefox = () => {
  return userAgent.indexOf("Firefox") > -1;
};
const isOpera = () => {
  return userAgent.indexOf("Opera") > -1;
};
module.exports = {
  isSafari,
  isChrome,
  isOpera,
  isFirefox,
  isEdge
};
