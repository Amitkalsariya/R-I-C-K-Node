const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Menual = new Schema({
  name: String,
  sname: String,
  password: String
});
module.exports = mongoose.model('user', Menual);