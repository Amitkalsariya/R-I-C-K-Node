var express = require('express');
var router = express.Router();
const   USER=require('../Models/user')
/* GET home page. */
router.get('/', async(req, res, next)=> {
  const data=await USER.find(req.body)
  res.render('index', { title: 'Express',data });
});
 router.post ('/add',async (req,res)=>{
  console.log(req.body);
  await USER.create(req.body)
  res.redirect('/')
 })
 router.get('/deleteData' ,async(req,res)=>{
  const dId=req.query.delete
  await USER.findByIdAndDelete(dId)
  res.redirect('/')
 })
module.exports = router;
                       

