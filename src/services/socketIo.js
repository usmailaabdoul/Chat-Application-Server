const InboxModel = require('../models/inbox');

class SocketIoService {
  constructor(socket) {
    this.socket = socket;
  }

  userJoin() {
    this.socket.on('join', ({ name, room }, callback) => {

      console.log({ name, room })
    })
  }

  createInbox() {
    this.socket.on('createInbox', ({ user, activeChat }, callback) => {

      let inbox_id = `${user.id}${activeChat.id}`;

      // let inbox = {senderId: user._id, recieverId: reciever._id}

      // const newInbox = await InboxModel.create(inbox);
      // let _inboxs = await InboxModel.aggregate([
      //   {
      //     $lookup: {
      //       from: 'genres', localField: 'genreId', foreignField: '_id', as: 'genre'
      //     }
      //   }
      // ])

      // let _newInbox = _inboxs.find((b) => `${b._id}` === `${newInbox._id}`);

      console.log({ inbox_id })
      this.socket.join(inbox_id)
    })
  }

  createGroup() {
    this.socket.on('createGroup', ({ users }, callback) => {
      console.log({ users })
    })
  }

  sendMessage(io) {
    this.socket.on('sendMessage', ({ inbox_id, message }, callback) => {
      console.log({ inbox_id, message })

      io.to(inbox_id).emit(`${inbox_id}`, { message });
    })
  }
}

const socketIoService = new SocketIoService()

module.exports = socketIoService;
