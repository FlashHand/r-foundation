/**
 * @Description 计时器扩展函数
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/7/17 6:19 PM
 */
function delay(ms) {
  return new Promise((resolve,reject)=>{
    setTimeout(resolve, ms);
  })
}

module.exports = {
  delay
};
