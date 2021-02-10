const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    default: null
  },
}, {
  timestamps: true,
  strict: true
});

UserSchema.set('toJSON', {
  virtuals: true
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;