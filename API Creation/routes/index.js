var express = require('express');
var router = express.Router();
const multer = require('multer')
const allcontroller = require('../controllers/user')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+file.originalname.split('.').pop())
    }
  })
  
  const upload = multer({ storage: storage })


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

router.get('/stud', allcontroller.SECURE, allcontroller.Allstud);

router.post('/stud/studadd',upload.single('Pimage'), allcontroller.AddStud);
router.post('/stud/login', allcontroller.Loginstud);
module.exports = router;
