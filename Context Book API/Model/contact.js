
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const contact = new Schema({
  
  fullname: {
    type :String,
    required:true
  },
  email:  {
    type :String,
    required:true,
    unique:true
  },
  mobileno:  {
    type :String,
    required:true,
    unique:true
  },
  address: {
    type: String,
  },
  companyname: {
    type :String,
    required:true
  },
  position: {
    type :String,
    required:true
}

});
module.exports = mongoose.model('user3', contact);