/**
 * 拼接成一个访问链接
 */
module.exports = function urlResolver(...args) {
  if (args.length === 0) {
    // throw new Error('参数不能为空')
    return '';
  }
  let ret = args.reduce((v, item) => {
    if (v[v.length - 1] === '/' && item[0] === '/') {
      return v + item.slice(1);
    } else if (v[v.length - 1] !== '/' && item[0] !== '/') {
      return v + '/' + item;
    }
    return v + item;
  });

  if (/^https?:\/\//i.test(ret)) {
    return ret;
  }
  return 'http://' + ret;
}
