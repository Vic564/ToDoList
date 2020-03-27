const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now, required: true},
  modified: { type: Date, default: Date.now, required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
