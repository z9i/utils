/**
 * 数字转千分符
 * @param {String} v 待转字符串
 * @param {String} sep 分隔符
 */
module.exports = function toThousand(v, sep = ',') {
  if (Number(v)) {
    return String(v).trim().replace(/^(\d+)((\.\d+)?)$/, function (_, a, b) {
      return a.replace(/(\d)(?=(?:\d{3})+$)/g, function (x) { return x + sep }) + b;
    });
  }
  // 数值换转失败则原值返回
  return v;
}
