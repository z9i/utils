const toThousand = require('../lib')

console.log(toThousand(1234567)) // -> 1,234,567
console.log(toThousand(1234567.89)) // -> 1,234,567.89
console.log(toThousand(1234567.9999)) // -> 1,234,567.9999
console.log(toThousand('123456789')) // -> 123,456,789
console.log(toThousand('98765.4321')) // -> 98,765.4321
