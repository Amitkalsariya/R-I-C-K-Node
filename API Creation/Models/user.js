const mongoose=require('mongoose')
const Schema = mongoose.Schema;


const Stud = new Schema({
 id:String,
 password:String
});

module.exports = mongoose.model('user', Stud);