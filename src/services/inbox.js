const InboxModel = require('../models/inbox');
const UserService = require('../services/users');
const SocketIoService = require('../services/socketIo');

class InboxService {

  async createInbox(sender, reciever) {
    let obj = { senderId: sender._id, recieverId: reciever._id }

    const inbox = await InboxModel.create(obj);
    
    // SocketIoService.createInbox(inbox.id)
    return inbox;
  }

  async getUserInboxes(id) {
    let inboxes = await this.findInbox();

    // console.log({inboxes, id});
    let userInboxes = []
    inboxes.map((inbox) => {
      if (`${inbox.senderId}` === id || `${inbox.recieverId}` === id) {
        userInboxes.push(inbox);
      }
    })

    return userInboxes;
  }

  async findInbox(searchQuery = {}) {
    let inboxes = await InboxModel.aggregate([
      {
        $lookup: {
          from: 'users', localField: 'senderId', foreignField: '_id', as: 'sender'
        }
      },
      {
        $lookup: {
          from: 'users', localField: 'recieverId', foreignField: '_id', as: 'reciever'
        }
      },
      {$unwind: '$sender'},
      {$unwind: '$reciever'},
    ])

    return inboxes
  }

  async updateById(id, obj) {
    await InboxModel.updateOne({ _id: id }, obj, { new: true });
    return this.getByInboxId(id);
  };

  getByInboxId(id) {
    return InboxModel.findById(id);
  }

  async sendMessage(inbox_id, sender_id, message) {
    let inbox = await this.getByInboxId(inbox_id);
    let sender = await UserService.getByUserId(sender_id);
    
    let msg = {
      sender,
      message
    }

    let messages = [];
    messages = inbox.messages;

    messages.push(msg);

    let _inbox = await this.updateById(inbox_id, {messages});

    SocketIoService.sendMessage(inbox_id, msg)
    return _inbox;
  }
}

const inbox = new InboxService();

module.exports = inbox;