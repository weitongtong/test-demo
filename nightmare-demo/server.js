const httpServer = require('http-server')
const server = httpServer.createServer()

server.listen(8888)

// If Node.js is spawned with an IPC channel, the process.send() method can be used to send messages to the parent process. Messages will be received as a 'message' event on the parent's ChildProcess object.
// If Node.js was not spawned with an IPC channel, process.send() will be undefined.
if (process.send) {
  process.send('listening')
}