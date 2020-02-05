//som user.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/database', {useNewUrlParser: true});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //name: String,
  taskid: { type: String, required: true, unique: true },
  tasknote: { type: String, required: true },
  taskprio: { type: String, required: true },
  taskstatus: { type: String, required: true },
  //location: String,
  //created_at: Date,
  //updated_at: Date
});

const User = mongoose.model('Task', userSchema);

module.exports = Task;