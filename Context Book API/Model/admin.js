
const mongoose =require("mongoose")
const Schema = mongoose.Schema;
const admin = new Schema({
  aid:String,
  apass:String,
  fname:String,
  lname:String,
  email:String
});
module.exports=mongoose.model('user1', admin);