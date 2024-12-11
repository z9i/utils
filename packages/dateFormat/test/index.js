'use strict'

const assert = require('assert/strict')

const ok = assert.ok

const dateFormat = require('../lib')

describe('dateFormat', function () {
  it('Should return itself while it is a falsy', function () {
    let v = undefined
    ok(dateFormat(v) === v)
    v = false
    ok(dateFormat(v) === v)
    v = ''
    ok(dateFormat(v) === v)
    v = null
    ok(dateFormat(v) === v)
  })

  it('Should return itself while it cannot be parsed as a Date', function () {
    let v = []
    ok(dateFormat(v) === v)
    v = {}
    ok(dateFormat(v) === v)
    v = Object.create(null)
    ok(dateFormat(v) === v)
    v = new RegExp('a')
    ok(dateFormat(v) === v)
    v = class A {}
    ok(dateFormat(v) === v)
    v = function () {}
    ok(dateFormat(v) === v)
    v = '--'
    ok(dateFormat(v) === v)
  })

  it('Should return a string', function () {
    ok(typeof dateFormat(Date.now()) === 'string')
    ok(typeof dateFormat(new Date()) === 'string')
    ok(typeof dateFormat('2018-07-01 12:13:14') === 'string')
  })

  it('Should return a number while format is timestamp', function () {
    ok(typeof dateFormat(Date.now(), 'timestamp') === 'number')
  })

  it('Should return the correct value', function () {
    ok(dateFormat('2018-07-01 12:13:14', 'yyyy-MM-dd hh:mm:ss') === '2018-07-01 12:13:14')
    ok(dateFormat('2018-07-09T12:12:14', 'yyyy-MM-dd hh:mm') === '2018-07-09 12:12')
    ok(dateFormat('2018/07/01 12:13:14', 'timestamp') === 1530418394000)
    ok(dateFormat('2018/07/09T12:12:14', 'dd hh:mm:ss') === '09 12:12:14')
    ok(dateFormat('Oct 24, 2018 11:14:17 AM', 'yyyy-MM-dd hh:mm:ss') === '2018-10-24 11:14:17')
    ok(dateFormat('1541617206575', 'yyyy-MM-dd hh:mm:ss') === '2018-11-08 03:00:06')
  })

  it('Should support millisecond', function () {
    ok(dateFormat(new Date(2022, 1, 1, 1, 1, 1, 677), 'yyyy-MM-dd hh:mm:ss.SSS') === '2022-02-01 01:01:01.677')
  })

  it('Should support prefix zero', function () {
    ok(dateFormat(new Date(2022, 1, 1, 1, 1, 1, 677), 'yyyy-MM-dd hh:mm:ss.SSS') === '2022-02-01 01:01:01.677')
    ok(dateFormat(new Date(2022, 1, 1, 1, 1, 1, 677), 'yyyy-M-d h:m:s.SS') === '2022-2-1 1:1:1.677')
    ok(dateFormat(new Date(2022, 1, 1, 1, 1, 1, 7), 'yyyy-M-d h:m:s.SS') === '2022-2-1 1:1:1.07')
    ok(dateFormat(new Date(2022, 1, 1, 1, 1, 1, 7), 'yyyy-M-d h:m:s.SSS') === '2022-2-1 1:1:1.007')
    ok(dateFormat(new Date(2022, 1, 1, 1, 1, 1, 7), 'yyyy-M-d hh:mm:s.S') === '2022-2-1 01:01:1.7')
  })
})
