const USER = require('../models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.SECURE = async (req, res, next) => {
    try {
        // check token
        const token = req.headers.authorization
        console.log(token)
        if(!token){
            throw new Error("You are not login")
        }
        const checkToken = await jwt.verify(token, 'CDMI')

        console.log(checkToken.user)

        const newuser = await USER.findById(checkToken.user)
        if(!newuser){
            throw new Error("You are not valid user")
        }
        next()
    } catch (err) {
      res.status(404).json({
        status: "fail",
        error: err.message
      })
    }
  }

exports.getUsers = async (req, res, next) => {
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
}

exports.SignUp = async (req, res, next) => {
  try {
    console.log("data::", req.body)

    if(!req.body.name || !req.body.email || !req.body.password){
      throw new Error("Please enter valid fields")
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10)
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
}

exports.Login = async (req, res, next) => {
    try {
      console.log("data::", req.body)
  
      if(!req.body.email || !req.body.password){
        throw new Error("Please enter valid fields")
      }
  
      const newuser = await USER.findOne({email: req.body.email})
  
      if(!newuser){
        throw new Error("email is wrong")
      }
  
      const checkPass = bcrypt.compareSync(req.body.password, newuser.password)
  
      if(!checkPass){
        throw new Error("password is wrong")
      }

      const token = await jwt.sign({user: newuser._id}, 'CDMI', {
        expiresIn: '90d'
      })
  
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: newuser,
        token
      })
    } catch (err) {
      res.status(404).json({
        status: "fail",
        error: err.message
      })
    }
  }