var express = require('express');
var router = express.Router();
const adminController=require("../Controllers/admin");


router.get('/admin', adminController.Alladmin);

router.post('/admin/newadmin', adminController.New_admin);
module.exports = router;
