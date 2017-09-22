const Nightmare = require('nightmare')
const expect = require('chai').expect
const fork = require('child_process').fork

describe('test index.html', () => {
  let child

  // 测试开始前执行
  before((done) => {
    // 新建了一个子进程来启动 HTTP 服务器
    child = fork('server.js')
    child.on('message', (msg) => {
      if (msg === 'listening') {
        // done 是 mocha 提供的一个函数，用来表示异步操作完成。
        // 如果不调用 done，mocha 就会认为异步操作没有结束，不会往下执行，从而导致超时错误。
        done()
      }
    })
  })

  // 测试结束后执行
  after(() => {
    // 关闭子进程
    child.kill()
  })

  it('点击后标题改变', (done) => {
    const nightmare = Nightmare({ show: true })
    nightmare
      .goto('http://127.0.0.1:8888/index.html')
      .click('#demo')
      .wait(1000)
      .evaluate(() => {
        const dom = document.querySelector('#demo')
        return {
          text: dom.textContent,
          color: window.getComputedStyle(dom).color
        }
      })
      .end()
      .then(({ text, color }) => {
        expect(text).to.equal('hello wtt1')
        expect(color).to.equal('rgb(0, 0, 255)')
        done()
      })
      .catch((err) => {
        console.log(err)
        done()
      })
  })

})