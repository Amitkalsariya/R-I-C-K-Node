var express = require('express');
var router = express.Router();
const USER = require('../models/user');

/* GET home page. */
// router.get('/', async (req, res, next) => {
//   try {
//     res.status(200).json({
//       status: "success",
//       data: {}
//     })
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       error: err.message
//     })
//   }
// });

router.get('/users', async (req, res, next) => {
  try {
    const allUsers = await USER.find()
    res.status(200).json({
      status: "success",
      data: allUsers
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message
    })
  }
});

router.post('/users/signup', async (req, res, next) => {
  try {
    console.log("data::", req.body)

    if(!req.body.name || !req.body.email || !req.body.password){
      throw new Error("Please enter valid fields")
    }

    const newuser = await USER.create(req.body)

    res.status(200).json({
      status: "success",
      data: newuser
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message
    })
  }
});

router.post('/users/login', async (req, res, next) => {
  try {
    console.log("data::", req.body)

    if(!req.body.email || !req.body.password){
      throw new Error("Please enter valid fields")
    }

    const newuser = await USER.findOne({email: req.body.email})

    if(!newuser){
      throw new Error("email is wrong")
    }

    const checkPass = newuser.password === req.body.password

    if(!checkPass){
      throw new Error("password is wrong")
    }

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: newuser
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message
    })
  }
});

module.exports = router;


  