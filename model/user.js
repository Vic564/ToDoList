//importerar databas-clienten
const mongoose = require('mongoose');

require('dotenv').config();

const dbhostname = process.env.DBHOSTNAME || 'localhost';

const dbname = process.env.DBNAME || 'vptdldb'

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

//ansluter och definerar adress och namn
mongoose.connect(`mongodb://${dbhostname}/${dbname}`, options);

//importerar dokumentmall från mongoose
const Schema = mongoose.Schema;

//definierar dokumentmall
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now(), required: true},
  modified: { type: Date, default: Date.now(), required: true}
});

//skapar modellen i mongodb efter schema
const user = mongoose.model('User', userSchema);

//exporterar modellen...
module.exports = user;
