var express = require('express');
var router = express.Router();
const   USER=require('../Models/user');
const { response } = require('../app');
const { options } = require('./users');
/* GET home page. */
router.get('/', async(req, res, next)=> {
  // This is For Name Wise sorting Asscending Order
  // const data=await USER.find().sort({name:-1})

  // his is For Password Wise sorting Disscending Order
  // const data =await USER.find().sort({password:1})

  // This is For Display Pericular Feilds Like Name Surname
  // const data =await USER.find().select('password')
  // const data =await USER.find().select('-password -name')
  
  // This is for Skip Of Specify records
  // const data =await USER.find().skip(1)

  // This is for Set the limitations Of the records
  // const data =await USER.find().limit(2)
  
  // This is for Counts Total number of records avialabale in Collection
  // const counts= await USER.find().countDocuments()
  // console.log(counts);
  
  const search=req.query.q
  let data
  
  // const data=await USER.find(req.body)
  if(search)
  { 
    data=await USER.find({name:{$regex:search,$options:'i'}})

  }
  else
  {
    data =await USER.find()  
  }
  res.render('index', {data , updateData : {} });
});
 router.post ('/add',async (req,res)=>{
  // console.log(req.body);
  // const {id} = req.body; 
  // console.log(id);

  // if(id)
  // {
  //   await USER.findByIdAndUpdate(id,req.body)  

  // }
  // else
  // {

  // }
  if(req.body.id)
    {
      await USER.findByIdAndUpdate(req.body.id, req.body)  
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


//  This is First Method Of Update Operation
//  router.get('/updateData', async(req,res)=>{
//   const uId= req.query.update
//   const user= await USER.findById(uId)
//   console.log(user);
//    const aUser= await USER.find()
//   res.render('index',{data  :aUser ,updateData:user})
  
//  })

// This is Second Method of Update Operation
router.get('/updateData/:eid',async (req,res)=>{
  const editId= req.params.eid
  // console.log(editId);
  
  const ufeilds=await USER.findById(editId)
  // console.log(ufeilds);
  
  const data=await USER.find()
  res.render('index',{data:data, updateData:ufeilds  })
})
module.exports = router;
                       

  