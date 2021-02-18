const SocketIoService = require('./services/socketIo');

function socketIo(io) {
  io.on('connection', (socket) => {

    console.log('connected')
    SocketIoService.socket = socket;
  });
}

module.exports = socketIo;
