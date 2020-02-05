//importerar databas-clienten
const mongoose = require('mongoose');

//ansluter och definerar adress och namn
mongoose.connect('mongodb://localhost/database', {useNewUrlParser: true});

//importerar dokumentmall från mongoose
const Schema = mongoose.Schema;

//definierar dokumentmall
const userSchema = new Schema({
  //name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //location: String,
  //created_at: Date,
  //updated_at: Date
});

//skapar modellen i mongodb efter schema
const user = mongoose.model('User', userSchema);

//exporterar modellen...
module.exports = user;
