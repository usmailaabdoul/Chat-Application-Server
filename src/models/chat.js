const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User', 
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  strict: true
});

ChatSchema.set('toJSON', {
  virtuals: true
});

const Chat = mongoose.model('chat', ChatSchema, 'chats');

module.exports = Chat;
