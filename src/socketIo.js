const SocketIoService = require('./services/socketIo');

function socketIo(io) {
  SocketIoService.io = io
  io.on('connect', (socket) => {
    socket.on('join', ({ room }, callback) => {
      socket.join(room);
      callback();
    });
  });
}

module.exports = socketIo;
