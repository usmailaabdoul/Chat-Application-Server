const mongoose = require('mongoose');

const InboxSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User', 
    required: true
  },
  recieverId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  joined: {
    senderSocketId: {
      type: String,
      default: null
    },
    recieverSocketId: {
      type: String,
      default: null
    }
  },
  messages: {
    type: Array,
    default: [],
  },
  notifications: {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      default: null
    },
    unreads: {
      type: Number,
      default: 0,
    }
  }
}, {
  timestamps: true,
  strict: true
});

InboxSchema.set('toJSON', {
  virtuals: true
});

const Inbox = mongoose.model('Inbox', InboxSchema, 'inboxes');

module.exports = Inbox;
