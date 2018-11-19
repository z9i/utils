const urlResolver = require('../lib')

console.log(urlResolver('192.168.1.102', 'lib', 'test')) // -> http://192.168.1.102/lib/test
console.log(urlResolver('http://www.foo.com', 'bar')) // -> http://www.foo.com/bar
console.log(urlResolver('https://www.foo.com', 'demo', 'test.html')) // -> https://www.foo.com/demo/test.html
console.log(urlResolver('192.168.1.189/', 'api/', '/message')) // -> http://192.168.1.189/api/message
