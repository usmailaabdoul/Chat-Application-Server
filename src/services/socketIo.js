class SocketIoService {
  constructor(socket, io) {
    this.socket = socket;
    this.io = io;
  }

  createInbox(inbox_id) {
    let room = 'room_' + inbox_id;
    this.socket.join(room);
  }

  sendMessage(inbox_id, message) {
    let room = 'room_' + inbox_id;

    console.log({ room })
    // this.socket.emit(room, message)

    this.socket.join(room);
    this.io.to(room).emit('message', message);
    console.log('sent message')
  }

  join() {
    this.socket.on('join', ({ room }, callback) => {

      console.log({room})
  
      // if (error) return callback(error);
  
      // this.socket.emit('message', {text: 'welcome to the room'})
  
      this.socket.join(room);
  
      // this.io.to(room).emit('message', {room, text: 'welcome again'});
  
      callback()
    })
  }
}

const socketIoService = new SocketIoService()

module.exports = socketIoService;
