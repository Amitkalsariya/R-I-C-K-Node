var express = require('express');
var router = express.Router();
const USER=require('../Models/user')
/* GET home page. */
// router.get('/', async (req, res, next) =>{
// try {
//   res.status(200).json({
//     status:"Success",
//     data :""

//   })
// } catch (err) {
//     res.status(404).json({
//       status:"Fail to Load",
//       error:err
      

//     })

// }
  
// });

router.get('/stud', async (req, res, next) =>{
  try {
    const allStud= await USER.find()
    // console.log(allStud);
    
    res.status(200).json({
      status:"Success",
      data :allStud
  
    })
  } catch (err) {
      res.status(404).json({
        status:"Fail to Load",
        error:err.message
      })
  
  }
    
  });
  
  router.post('/stud/studadd', async (req, res, next) =>{
    try {
    console.log(req.body);

      if(!req.body.id || !req.body.password)
      {
        throw new Error("Please Enter Valid Information")
      }
      const addstud= await USER.create(req.body)
      // console.log(allStud);
      
      res.status(200).json({
        status:"Success",
        data :addstud
    
      })
    } catch (err) {
        res.status(404).json({
          status:"Fail to Load",
          error:err.message
        })
    
    }
      
    });
    router.get('/stud/login', async (req, res, next) =>{
      try {
      console.log(req.body);
  
        if(!req.body.id || !req.body.password)
        {
          throw new Error("Please Must Enter The Details")
        }
        const checkid= await USER.findOne({id : req.body.id})
        if(!checkid)
        {
          throw new Error("Id is Not Found")
        }

        const checkpass=checkid.password===req.body.password
        if(!checkpass)
        {
          throw new Error("Password Not Found")  
        }
        // console.log(allStud);
        
        res.status(200).json({
          status:"Success",
          message:"Login Succesfully",
          data :checkid
      
        })
      } catch (err) {
          res.status(404).json({
            status:"Fail to Load",
            error:err.message
          })
      
      }
        
      });
module.exports = router;