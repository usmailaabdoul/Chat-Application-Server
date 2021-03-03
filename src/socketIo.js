const socketIoService = require('./services/socketIo');
const SocketIoService = require('./services/socketIo');

function socketIo(io) {
  SocketIoService.io = io

  io.on('connection', (socket) => {

    console.log('connected')
    SocketIoService.socket = socket;
    socketIoService.join()
  });
}

module.exports = socketIo;
