var express = require('express');
var router = express.Router();
const multer  = require('multer')
const userController = require('../controllers/user')

// fs

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
    } // ["untitled-3, jpg"]
  })
  
  const upload = multer({ storage: storage })
  

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

router.get('/users', userController.SECURE, userController.getUsers);

router.post('/users/signup', upload.single('profilePic'), userController.SignUp);

router.post('/users/login', userController.Login);

module.exports = router;


  