/**
 * 生成一个随机整数
 * @param {Number} a 最小值
 * @param {Number} b 最大值
 */
export function rnd(a, b) {
  return a + Math.floor(Math.random() * (b - a))
}

/**
 * 生成一个 UUID
 *
 * @param {number} range 取值范围，采用二进制判断规则，传入失败则使用标准的十六进制字符串
 * @param {string} mask 模板，默认为通用的 UUID 标准
 */
export default function uuid(range = 0, mask = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx') {
  const num = '0123456789';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let str = '';
  let r2 = range.toString(2);
  if (r2[r2.length - 1] === '1') {
    str += num;
  }
  if (r2[r2.length - 2] === '1') {
    str += lower;
  }
  if (r2[r2.length - 3] === '1') {
    str += upper;
  }
  if (!str) {
    str = '013456789abcdef';
  }
  return mask.replace(/[0-9a-zA-Z]/g, () => str[rnd(0, str.length)])
}
