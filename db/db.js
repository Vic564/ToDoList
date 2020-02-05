const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/database', {useNewUrlParser: true});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //location: String,
  //created_at: Date,
  //updated_at: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;
