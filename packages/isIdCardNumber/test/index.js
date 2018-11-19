const isIdCardNumber = require('../lib')

console.log(isIdCardNumber(1234567)) // -> false
console.log(isIdCardNumber('110115198512141547')) // -> true
console.log(isIdCardNumber('110115198512141666')) // -> false
