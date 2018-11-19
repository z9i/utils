/**
 * 验证是否是身份证号码
 * 身份证规则（GB11643-1999）：
 * 15 位时，次序为省（2位）市（2位）县（2位）年（2位）月（2位）日（2位）顺序码（3位）
 * 18 位时，次序为省（2位）市（2位）县（2位）年（4位）月（2位）日（2位）顺序码（3位，最后一位奇数为男性，偶数为女性）较验位（1位，数字或者字母 X）
 * @param {String} value 待验证字符串
 * @param {Boolean} strict 开启 18 位严格校验（检测校验位）
 * @returns {Boolean}
 */
module.exports = function isIdCardNumber(value, strict = true) {
  // 身份证的基本正则表达式
  var regIdCard = /^(\d{2})\d{4}(?:\d{2}(?:0[1-9]|1[012])(?:0[1-9]|[12]\d|3[01])\d{3}|((?:18|19|20)\d{2}(?:0[1-9]|1[012])(?:0[1-9]|[12]\d|3[01]))\d{3}(?:[0-9xX]))$/;

  value = String(value);

  var matched = value.match(regIdCard);

  // 格式不通过，直接返回
  if (!matched) {
    return false;
  }

  var pdata = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82', '91'];
  // 行政区划验证
  if (pdata.indexOf(matched[1]) === -1) {
    return false;
  }

  // 18 位身份证的严格校验
  if (matched[2] && strict) {
    // /* 考虑到 iOS 系统的时间对象的兼容性，和 new Date 本身的容错特性，这一步不再检查 */
    // // 出生日期时间的校验
    // var birth = matched[2].split('');
    // birth.splice(6, 0, '-');
    // birth.splice(4, 0, '-');
    // if (isNaN(new Date(birth.join('')).getTime())) {
    //   return false;
    // }

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
