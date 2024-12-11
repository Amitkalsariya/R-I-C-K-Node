var express = require('express');
var router = express.Router();
const USER=require('../Models/user');

/* GET home page. */
// router.get('/', async(req, res, next) =>{
// try {
//   res.status(200).json({
//     status:"Success",
//     data:{}
//   })
// } catch (err) {
//   res.status(404).json({
//     status:"Failed",
//     error:err.message
//   })
// }
// });

router.get('/signup',async(req,res)=>{
  try {
    res.status(200).json({
      status:"Succesfully",
      data:{}
    })
  } catch (err) {
    res.status(200).json({
      status:"Failed to Load",
      error:err.message

    })

  }
})
module.exports = router;
