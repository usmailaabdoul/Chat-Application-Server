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
}, {
  timestamps: true,
  strict: true
});

// InboxSchema.set('toJSON', {
//   virtuals: true
// });

const Inbox = mongoose.model('Inbox', InboxSchema, 'inboxs');

module.exports = Inbox;
