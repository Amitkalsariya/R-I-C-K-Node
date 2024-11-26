var express = require('express');
var router = express.Router();
const   USER=require('../Models/user')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 router.post ('/',async (req,res)=>{
  console.log(req.body);
  await USER.create(req.body)
  res.redirect('/')
 })
module.exports = router;
