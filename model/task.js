const mongoose = require('mongoose');

require('dotenv').config();

const dbHostName = process.env.DBHOSTNAME || 'localhost';

const dbName = process.env.DBNAME || 'vptdldb'

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(`mongodb://${dbHostName}/${dbName}`, options);

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userid: { type: String, required: true },
  note: { type: String, required: true },
  prio: { type: Number, required: true },
  status: { type: Boolean, required: true },
  created: { type: Date, default: Date.now, required: true},
  modified: { type: Date, default: Date.now, required: true}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
