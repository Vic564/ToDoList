//som user.js
const mongoose = require('mongoose');

require('dotenv').config();

const dbhostname = process.env.DBHOSTNAME || 'localhost';

const dbname = process.env.DBNAME || 'vptdldb'

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(`mongodb://${dbhostname}/${dbname}`, options);

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  //name: String,
  userid: { type: String, required: true },
  note: { type: String, required: true },
  prio: { type: Number, required: true },
  status: { type: Boolean, required: true },
  created: { type: Date, default: Date.now(), required: true},
  modified: { type: Date, default: Date.now(), required: true}
  //location: String,
  //created_at: Date,
  //updated_at: Date
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
