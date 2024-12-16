
const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const Course = new Schema({
 course_id:String,
 course_no:String,
 c_name:String,
 c_price:String
});
module.exports = mongoose.model('user', Course);