class SocketIoService {
  constructor(socket, io) {
    this.socket = socket;
    this.io = io;
  }

  sendMessage(inbox_id, message) {
    let room = 'inbox_' + inbox_id;

    this.io.to(room).emit('message', message);
  }
}

const socketIoService = new SocketIoService()

module.exports = socketIoService;
