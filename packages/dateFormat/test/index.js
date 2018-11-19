const dateFormat = require('../lib');

console.log(dateFormat(Date.now()))
console.log(dateFormat('2018-07-01 12:13:14', 'yyyy-MM-dd hh:mm:ss'))
console.log(dateFormat('2018-07-09T12:12:14', 'yyyy-MM-dd hh:mm'))
console.log(dateFormat('2018/07/01 12:13:14', 'timestamp'))
console.log(dateFormat('2018/07/09T12:12:14', 'dd hh:mm:ss'))
console.log(dateFormat('Oct 24, 2018 11:14:17 AM', 'yyyy-MM-dd hh:mm:ss'))
console.log(dateFormat('1541617206575', 'yyyy-MM-dd hh:mm:ss'))

/*
2018-11-19
2018-07-01 12:13:14
2018-07-09 12:12
1530418394000
09 12:12:14
2018-10-24 11:14:17
2018-11-08 03:00:06
*/
