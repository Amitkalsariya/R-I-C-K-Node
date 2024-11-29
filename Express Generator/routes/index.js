var express = require('express');
var router = express.Router();
const   USER=require('../Models/user');
const { response } = require('../app');
/* GET home page. */
router.get('/', async(req, res, next)=> {
  const data=await USER.find(req.body)
  res.render('index', {data , updateData : null });
});
 router.post ('/add',async (req,res)=>{
  console.log(req.body);
  const {id} = req.body; 
  console.log(id);

  if(id)
  {
    await USER.findByIdAndUpdate(id,req.body)  

  }
  else
  {

    await USER.create(req.body)
  }
  res.redirect('/')
 })
 router.get('/deleteData' ,async(req,res)=>{
  const dId=req.query.delete
  await USER.findByIdAndDelete(dId)
  res.redirect('/')
 })
 router.get('/updateData', async(req,res)=>{
  const uId= req.query.update
  const user= await USER.findById(uId)
  console.log(user);
   const aUser= await USER.find()
  res.render('index',{data  :aUser ,updateData:user})
  
 })
module.exports = router;
                       

