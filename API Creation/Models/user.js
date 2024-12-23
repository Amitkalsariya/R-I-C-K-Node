const mongoose=require('mongoose')
const Schema = mongoose.Schema;


const Stud = new Schema({
 id:{
    type:String,
    required:true,
    trim:true    
},
 password:{
    type:String,
    required:true
 },
 P_image:String
});

module.exports = mongoose.model('user', Stud);