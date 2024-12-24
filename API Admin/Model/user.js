const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Admin = new Schema({
  aid:{
    type:String,
    required:true,
    unique:true
  },
  apin:{
    type:String,
    required:true
  }

});
module.exports=mongoose.model('user',Admin);