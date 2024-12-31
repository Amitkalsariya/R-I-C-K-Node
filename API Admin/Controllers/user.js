const ADMIN = require('../Model/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.SECURE = async function (req, res, next) {
  try {
    const token = req.headers.authorization
    if (!token) {
      throw new Error("Please Provide Token")
    }
    const decodetoken = await jwt.verify(token, "RICK")
    console.log(decodetoken.user);

    const nuser = await ADMIN.findById(decodetoken.user)
    if (!nuser) {
      throw new Error("User not Found")
    }
    next();
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      error: err.message
    })
  }
}
exports.Alladmin = async function (req, res) {
  try {
    const allAdmins = await ADMIN.find();
    res.status(200).json({
      status: "Success",
      data: allAdmins
    })
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      error: err.message
    })
  }
}
exports.Admin_signup = async function (req, res) {
  try {
    console.log(req.files);
    if (!req.body.aid || !req.body.apin) {
      throw new Error("Please Provide Admin ID and Admin Pin");
    }


//  This is For Array Method Of Multer
    // const fileNames = req.files.map(file => file.filename);

    // console.log("Uploaded File Names:", fileNames);

    // req.body.aimage = fileNames;

    // const mulitfiles=req.files.map(file=>file.filename);
    // console.log("Uploaded Feilds File Names:",mulitfiles);
    // req.body.aimage=mulitfiles;

  // This is For Feilds Method Of Multer

  const fileNames = req.files['admin_image'] ? req.files['admin_image'].map(file => file.filename) : [];
  const documentFileNames = req.files['document'] ? req.files['document'].map(file => file.filename) : [];
  const profile_picture = req.files['profile_picture'] ? req.files['profile_picture'][0].filename : null;
  console.log("Uploaded File Names:", fileNames);

  // Add the filenames of uploaded images to the request body
  req.body.aimage = fileNames;
  req.body.picture=profile_picture;
  req.body.document=documentFileNames;
    req.body.apin = bcrypt.hashSync(req.body.apin, 10)

    const add_admin = await ADMIN.create(req.body);
    console.log(req.body);

    res.status(200).json({
      status: "Success",
      data: add_admin
    })
  } catch (err) {
    res.status(404).json({
      status: "Failed To Create Admin",
      error: err.message
    })
  }
}
exports.Admin_login = async function (req, res) {
  try {
    console.log(req.body);
    if (!req.body.aid || !req.body.apin) {
      throw new Error("Please Provide Admin ID and Admin Pin");
    }
    const checkid = await ADMIN.findOne({ aid: req.body.aid });
    if (!checkid) {
      throw new Error("Admin ID Not Found");
    }
    const checkpin = bcrypt.compareSync(req.body.apin, checkid.apin);
    if (!checkpin) {
      throw new Error("Admin Pin Not Matched");
    }


    const token = await jwt.sign({ id: checkid._id }, "RICK", {
      expiresIn: '90d'
    })
    res.status(200).json({
      status: "Success",
      data: checkid, token
    })
  } catch (err) {
    res.status(404).json({
      status: "Failed To Login Admin",
      error: err.message
    })
  }
}
