(function (global, factory) {
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
 * @param {number|string|Date} v 待解析
 * @param {string} format 解析后的格式，如果传入 `timestamp` 则直接返回时间戳
 */
return function dateFormat(v, format) {
  if (!v) {
    return v;
  }
  if (typeof format !== 'string') {
    format = 'YYYY-MM-DD'
  }
  // 如果传入国际标准字符串，并且刚好是 12 点，则将上午标识修订为下午
  if (typeof v === 'string' && /12(:00(:00)?)? AM/i.test(v)) {
    v = v.replace(/AM/i, 'PM');
  }
  var _date = v instanceof Date ? v : new Date(/^\d+$/.test(v) ? +v : v);
  var _time = _date.getTime();

  if (isNaN(_time) && typeof v === 'string') {
    var match = v.match(/^(\d+)[-/](\d+)[-/](\d+)[Tt\s](\d+):(\d+):(\d+)/);
    if (match) {
      _date = new Date(+match[1], +match[2] - 1, +match[3], +match[4], +match[5], +match[6]);
      _time = _date.getTime();
    }
  }

  if (isNaN(_time)) {
    return v; // 解析失败返回原值
  }

  if (format === 'timestamp') {
    return _time;
  }

  var ret = format;

  var o = {
    'M+': _date.getMonth() + 1, // month
    'd+': _date.getDate(), // day
    'D+': _date.getDate(), // day
    'H+': _date.getHours(), // hour
    'h+': _date.getHours(), // hour
    'm+': _date.getMinutes(), // minute
    's+': _date.getSeconds(), // second
    'S': _date.getMilliseconds() // millisecond
  };

  // 年份处理
  ret = ret.replace(/y{4}/gi, function (year) {
    return _date.getFullYear();
  });
  ret = ret.replace(/y{2}/gi, function (year) {
    return ('' + _date.getFullYear()).substr(2);
  });

  // 其他格式化处理
  for (var k in o) {
    ret = ret.replace(new RegExp(k, 'g'), function (a) {
      // 补零操作
      if (a.length > 1) {
        return ('00' + o[k]).substr(('' + o[k]).length);
      }
      return o[k];
    });
  }

  return ret;

}
}));
