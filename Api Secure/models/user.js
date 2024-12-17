const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const Menual1 = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password:{
    type: String,
    required: true
  }
});
module.exports = mongoose.model('user', Menual1); 