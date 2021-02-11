const InboxModel = require('../models/inbox');
const InboxService = require('../services/inbox');

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
    this.socket.on('createNewInbox', async ({ sender, reciever }, callback) => {

      // let inbox_id = `${sender.id}${reciever.id}`;

      const newInbox = await InboxService.createInbox(sender, reciever);
      let _inboxes = await InboxService.findInbox();

      console.log({newInbox, _inboxes})
      let _newInbox = _inboxes.find((i) => `${i._id}` === `${newInbox._id}`);

      console.log('id', _newInbox._id)
      this.socket.join(_newInbox._id)
    })
  }

  createGroup() {
    this.socket.on('createGroup', ({ users }, callback) => {
      console.log({ users })
    })
  }

  sendMessage(io) {
    this.socket.on('sendMessage', ({ inboxId, message }, callback) => {
      console.log({ inboxId, message })

      io.to(inboxId).emit(`${inboxId}`, { message });
    })
  }
}

const socketIoService = new SocketIoService()

module.exports = socketIoService;
