//som user.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/database', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  //name: String,
  userid: { type: String, required: true, unique: true },
  note: { type: String, required: true },
  prio: { type: String, required: true },
  status: { type: String, required: true },
  //location: String,
  //created_at: Date,
  //updated_at: Date
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;