class SocketIoService {
  constructor(socket) {
    this.socket = socket;
  }

  createInbox(inbox_id) {
    let room = 'room_' + inbox_id;
    this.socket.join(room);
  }

  sendMessage(inbox_id, message) {
    let room = 'room_' + inbox_id;

    console.log({ room })
    this.socket.emit(room, message)
    console.log('sent message')
  }
}

const socketIoService = new SocketIoService()

module.exports = socketIoService;
