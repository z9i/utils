;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.dateFormat = factory());
}(this, function () {

/**
 * 日期时间的格式化处理
 *
 * 如果时间格式匹配到了 `YYYY-MM-DD hh:mm:ss`，则直接解析
 * 防止各种可能的系统兼容性问题，尤其是 iOS。
 * 支持的示例：
 * - `2018-07-01 12:13:14`
 * - `2018-07-09T12:12:14`
 * - `2018/07/01 12:13:14`
 * - `2018/07/09T12:12:14`
 * 调用的 Date 对象方法：
 *   new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
 *
 * 通常来说建议直接传入时间戳或者 Date 实例，避免字符串处理中出现的异常问题
 * @see https://www.zhihu.com/question/385794468/answer/1137013403
 *
 * @param {number|string|Date} v 待解析
 * @param {string} format 解析后的格式，如果传入 `timestamp` 则直接返回时间戳，默认格式为 YYYY-MM-DD
 */
return function dateFormat(v, format) {
  // 不处理假值
  if (!v) {
    return v;
  }
  var date;
  if (v instanceof Date) {
    date = v;
  } else if (typeof v === 'object') {
    // 其他对象类型的不处理，原值返回
    return v;
  } else {
    if (typeof v === 'string') {
      // 如果传入国际标准字符串，并且刚好是 12 点，则将上午标识修订为下午
      if (/12(:00(:00)?)? AM/i.test(v)) {
        v = v.replace(/AM/i, 'PM');
      }
      // 直接替换字符串中的横杠，避免可能的兼容性问题
      v = v.replace(/-/g, '/');
    }
    date = new Date(/^\d+$/.test(v) ? +v : v);
  }
  var time = date.getTime();

  if (isNaN(time) && typeof v === 'string') {
    // 匹配 YYYY-MM-DD HH:mm:ss.SSS 格式，进行精确析取，但会忽略时区
    var match = v.match(/^(\d+)[-/](\d+)[-/](\d+)[Tt\s](\d+):(\d+):(\d+)(?:\.(\d+))?/);
    if (match) {
      date = new Date(+match[1], +match[2] - 1, +match[3], +match[4], +match[5], +match[6], +match[7] || 0);
      time = date.getTime();
    }
  }

  if (isNaN(time)) {
    return v; // 解析失败返回原值
  }

  if (typeof format !== 'string') {
    format = 'YYYY-MM-DD';
  }

  if (format === 'timestamp') {
    return time;
  }

  var ret = format;

  var o = {
    'M{1,2}': date.getMonth() + 1, // 月
    'd{1,2}': date.getDate(), // 日
    'D{1,2}': date.getDate(), // 日
    'H{1,2}': date.getHours(), // 时
    'h{1,2}': date.getHours(), // 时
    'm{1,2}': date.getMinutes(), // 分
    's{1,2}': date.getSeconds(), // 秒
    'S{1,3}': date.getMilliseconds() // 毫秒
  };

  // 年份处理
  ret = ret.replace(/y{4}/gi, function (year) {
    return date.getFullYear();
  });
  ret = ret.replace(/y{2}/gi, function (year) {
    return ('' + date.getFullYear()).slice(-2);
  });

  // 其他格式化处理
  for (var k in o) {
    ret = ret.replace(new RegExp(k, 'g'), function (a) {
      var r = o[k];
      // 补零操作
      if (String(r).length < a.length) {
        return ('00' + r).slice(-a.length);
      }
      return r;
    });
  }

  return ret;
}

}));
