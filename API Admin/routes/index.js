var express = require('express');
var router = express.Router();
const multer =require('multer')
const Admincontroller=require('../Controllers/user')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.originalname.split('.').pop())
    }
  })
  
  const upload = multer({ storage: storage })
/* GET home page. */
router.get('/admin',Admincontroller.SECURE, Admincontroller.Alladmin);
// This is Array Method of Multer
// router.post('/admin/admin_signup',upload.array('admin_image',[10]), Admincontroller.Admin_signup );

router.post('/admin/admin_signup',upload.array('admin_image',[10]), Admincontroller.Admin_signup );
router.post('/admin/admin_login', Admincontroller.Admin_login);
module.exports = router;
