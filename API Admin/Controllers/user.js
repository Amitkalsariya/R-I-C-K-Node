const  ADMIN=require('../Model/user');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
exports.Alladmin=async function(req, res) {
  try {
    const allAdmins= await ADMIN.find();
    res.status(200).json({
      status:"Success",
      data:allAdmins
    })
  } catch (err) {
    res.status(404).json({
      status:"Failed",
      error:err.message
    })
  }
}
exports.Admin_signup=async function(req, res) {
  try {
    console.log(req.body);
    if(!req.body.aid || !req.body.apin){
      throw new Error("Please Provide Admin ID and Admin Pin");
    } 
    req.body.apin=bcrypt.hashSync(req.body.apin,10)
    
    const add_admin= await ADMIN.create(req.body);
    res.status(200).json({
      status:"Success",
      data:add_admin
    })
  } catch (err) {
    res.status(404).json({
      status:"Failed To Create Admin",
      error:err.message
    })
  }
}
exports.Admin_login=async function(req, res) {
    try {
      console.log(req.body);
      if(!req.body.aid || !req.body.apin){
        throw new Error("Please Provide Admin ID and Admin Pin");
      } 
      const checkid=await ADMIN.findOne({aid:req.body.aid});
      if(!checkid){
        throw new Error("Admin ID Not Found");
      }
      const checkpin=bcrypt.compareSync(req.body.apin,checkid.apin);
      if(!checkpin){
        throw new Error("Admin Pin Not Matched");
      }
      

      const token= await jwt.sign({id:checkid._id},"RICK",{
        expires:'90d'
    })
      res.status(200).json({
        status:"Success",
        data:checkid,token
      })
    } catch (err) {
      res.status(404).json({
        status:"Failed To Login Admin",
        error:err.message
      })
    }
  }