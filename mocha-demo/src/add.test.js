const add = require('./add.js')
const assert = require('assert') // node原生自带
const expect = require('chai').expect // chai模块

describe('测试add方法', () => {
  it('1 + 1 应该等于 2', () => {
    expect(add(1, 1)).to.be.equal(2)
  })
  it('3 + (-3) 应该等于 0', () => {
    assert.equal(0, add(3, -3))
  })
})