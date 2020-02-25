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

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now, required: true},
  modified: { type: Date, default: Date.now, required: true}
});

const user = mongoose.model('User', userSchema);

module.exports = user;
