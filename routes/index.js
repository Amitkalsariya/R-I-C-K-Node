var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const USER = require('../models/user');
/* GET home page. */
router.get('/', async (req, res, next) => {


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

  const search = req.query.q
  let data

  // const data=await USER.find(req.body)
  if (search) {
    data = await USER.find({ name: { $regex: search, $options: 'i' } })

  }
  else {
    data = await USER.find()
  }
   res.render('index', { data, updateData: {} });
 
});
router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/signup', (req, res) => {
  res.redirect('/');
});

router.post('/add', async (req, res) => {

  // This is Another Method Of If condition
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


  if (req.body.id) {

    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10)
    } else {
      delete req.body.password
    }
    await USER.findByIdAndUpdate(req.body.id, req.body)
  }
  else {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    // req.body.password = bcrypt.compareSync(req.body.password, 10)
    await USER.create(req.body)
  }
  res.redirect('/')
})
router.get('/deleteData', async (req, res) => {
  const dId = req.query.delete
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
router.get('/updateData/:eid', async (req, res) => {
  const editId = req.params.eid
  // console.log(editId);

  const ufeilds = await USER.findById(editId)
  // console.log(ufeilds);

  const data = await USER.find()
  res.render('index', { data: data, updateData: ufeilds })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let data = await USER.findOne({ email: email })
  // console.log("hello" , data);
  console.log("password->",password);
  console.log("data.password->",data.password);

    const psmatch = await bcrypt.compare(password, data.password)
    console.log("psmatch ==> ",psmatch);
    
    if (psmatch) {
     res.render('index')
    }
   else {
    res.send("Wrong Credentials")
    
  }
  

})

module.exports = router;


  