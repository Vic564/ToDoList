const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userID: { type: String, required: true },
  note: { type: String, required: true },
  prio: { type: Number, required: true },
  status: { type: Boolean, required: true },
  created: { type: Date, default: Date.now, required: true},
  modified: { type: Date, default: Date.now, required: true}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
