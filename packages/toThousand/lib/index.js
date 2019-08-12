(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.toThousand = factory());
}(this, function () {
/**
 * 数字转千分符
 * @param {String} v 待转字符串
 * @param {String} sep 分隔符
 */
return function toThousand(v, sep) {
  var sepChar = typeof sep === 'string' ? sep : ','
  if (Number(v)) {
    return String(v).trim().replace(/^(\d+)((\.\d+)?)$/, function (_, a, b) {
      return a.replace(/(\d)(?=(?:\d{3})+$)/g, function (x) { return x + sepChar }) + b;
    });
  }
  // 数值换转失败则原值返回
  return v;
}

}));
