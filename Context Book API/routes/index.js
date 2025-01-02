var express = require('express');
var router = express.Router();
const adminController=require("../Controllers/admins");
const userController=require("../Controllers/users");
const contactController=require("../Controllers/contacts");
const USER=require('../Model/user');

// This Route iS For Admins
router.get('/admin', adminController.Alladmin);
router.post('/admin/newadmin', adminController.New_admin);
router.delete('/admin/removeadmin/:aid',adminController.Delete_admin)
// This Route iS For Users
router.get('/user',userController.Alluser)
router.post('/user/newuser',userController.New_user)
router.delete('/user/removeuser/:aid',adminController.Delete_admin)


// This Route iS For Contacts
router.get('/contact',contactController.Allcontact)
router.post('/contact/newcontact',contactController.New_contact)

module.exports = router;
