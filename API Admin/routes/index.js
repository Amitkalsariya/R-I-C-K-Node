var express = require('express');
var router = express.Router();

const Admincontroller=require('../Controllers/user')
/* GET home page. */
router.get('/admin', Admincontroller.Alladmin);
router.post('/admin/admin_signup',Admincontroller.Admin_signup );
router.post('/admin/admin_login', Admincontroller.Admin_login);
module.exports = router;
