const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const Menual1 = new Schema({
  name: String,
  email:String,
  password:String
});
module.exports = mongoose.model('user', Menual1); 