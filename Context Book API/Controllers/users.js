const USER=require('../Model/user')

exports.Alluser=async function(req,res) {
    try {
        const alluser=await USER.find()
       res.status(200).json({
        status:"Success For Get All User",
        data:alluser

       }) 
    } catch (error) {
        res.status(404).json({
            status:"Failed To Load The Data",
            error:error.message
        })
    }
}
exports.New_user=async function(req,res) {
  try {
      if(!req.body.fname || !req.body.mname || !req.body.lname || !req.body.email || !req.body.password || !req.body.dob || !req.body.phone){
      throw new Error ("Please enter Your All Details For User Data")
      }
      const newuser=await USER.create(req.body)
     res.status(200).json({
      status:"Success For Add New User",
      data:newuser

     }) 
  } catch (error) {
      res.status(404).json({
          status:"Failed To Create The User",
          error:error.message
      })
  }
}