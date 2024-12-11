const { default: mongoose } = require("mongoose");


const Schema = mongoose.Schema;


const Api = new Schema({
  name: String,
  id: String,
  password: String
});
module.exports = mongoose.model('user', Api);
