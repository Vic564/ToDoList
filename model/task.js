//som user.js
const mongoose = require('mongoose');

require('dotenv').config();

const dbhostname = process.env.DBHOSTNAME || 'localhost';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(`mongodb://${dbhostname}/vptdldb`, options);

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
