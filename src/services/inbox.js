const InboxModel = require('../models/inbox');

class InboxService {

  async createInbox(sender, reciever) {
    let obj = { senderId: sender._id, recieverId: reciever._id }

    const inbox = await InboxModel.create(obj);
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
}

const inbox = new InboxService();

module.exports = inbox;