/**
 * 验证是否是身份证号码
 * 身份证规则（GB11643-1999）：
 * 15 位时，次序为省（2位）市（2位）县（2位）年（2位）月（2位）日（2位）顺序码（3位）
 * 18 位时，次序为省（2位）市（2位）县（2位）年（4位）月（2位）日（2位）顺序码（3位，最后一位奇数为男性，偶数为女性）较验位（1位，数字或者字母 X）
 * 注：从 1999 年 10 月 1 日起，全国实行公民身份证号码制度，居民身份证编号由原 15 位升至 18 位。
 * 港澳台由于特殊原因，身份证号码规则可能有所不同，可以不参与校验，这里不做排除。
 * @param {String} value 待验证字符串
 * @param {Boolean} s15 是否支持 15 位身份证号码
 * @returns {Boolean}
 */
module.exports = function isIdCardNumber(value, s15 = true) {
  if (typeof value !== 'string') {
    // 不是字符串的不做判断
    return false;
  }
  // 身份证的基本正则表达式
  var regIdCard15 = /^(\d{2})\d{4}(?:(\d{2})(0[1-9]|1[012])(0[1-9]|[12]\d|3[01]))\d{3}$/;
  var regIdCard18 = /^(\d{2})\d{4}((?:18|19|20)\d{2})(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}[0-9xX]$/;

  var matched = value.match(regIdCard18);
  var strict = true;

  // 18 位格式不通过时，再判断 15 位的标识
  if (!matched && s15) {
    matched = value.match(regIdCard15);
    if (!matched) {
      return false;
    }
    matched[2] = '19' + matched[2]; // 不考虑 18xx 年出生的人，所有 15 位身份证号码的人均视为 20 世纪的人。
    strict = false;
  }

  if (!isAD(+matched[1])) {
    return false;
  }

  // 年月日的判断
  var year = +matched[2];
  var month = +matched[3];
  var date = +matched[4];

  var dates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(year)) {
    dates[1] = 29;
  }

  if (date > dates[month - 1]) {
    return false;
  }

  // 18 位身份证的严格校验
  if (strict) {
    // 校验位的验证（ISO 7064:1983.MOD 11-2）
    var codes = value.toLowerCase().split('');
    // 加权因子
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验位
    var parity = ['1', '0', 'x', '9', '8', '7', '6', '5', '4', '3', '2'];

    var sum = 0;
    for (var i = 0; i < 17; i++) {
      sum += factor[i] * codes[i];
    }

    if (parity[sum % 11] !== codes[17]) {
      return false;
    }

  }
  return true;
}

/**
 * 判断是否为闰年
 * @param {Number} v 传入的年份
 */
function isLeapYear(v) {
  return (v % 400 === 0) || (v % 4 === 0 && v % 100 !== 0)
}

/**
 * 是否在行政区划之中
 * @param {Number} v 传入的行政区划代码的前两位
 */
function isAD(v) {
  const AD_LIST = [
    11, // 北京市
    12, // 天津市
    13, // 河北省
    14, // 山西省
    15, // 内蒙古自治区
    21, // 辽宁省
    22, // 吉林省
    23, // 黑龙江省
    31, // 上海市
    32, // 江苏省
    33, // 浙江省
    34, // 安徽省
    35, // 福建省
    36, // 江西省
    37, // 山东省
    41, // 河南省
    42, // 湖北省
    43, // 湖南省
    44, // 广东省
    45, // 广西壮族自治区
    46, // 海南省
    50, // 重庆市
    51, // 四川省
    52, // 贵州省
    53, // 云南省
    54, // 西藏自治区
    61, // 陕西省
    62, // 甘肃省
    63, // 青海省
    64, // 宁夏回族自治区
    65, // 新疆维吾尔自治区
    71, // 台湾省
    81, // 香港特别行政区
    82 // 澳门特别行政区（部分资料标识为 91 的系错误数据）
  ];

  return AD_LIST.indexOf(v) !== -1;
}
