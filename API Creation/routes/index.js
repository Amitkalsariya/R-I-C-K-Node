var express = require('express');
var router = express.Router();
const USER=require('../Models/user')
const allcontroller=require('../controllers/user')
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

router.get('/stud',allcontroller.Allstud );
  
  router.post('/stud/studadd', allcontroller.AddStud);
    router.get('/stud/login', allcontroller.Loginstud);
module.exports = router;
