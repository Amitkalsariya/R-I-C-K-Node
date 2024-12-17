var express = require('express');
var router = express.Router();
const USER = require('../models/user');
const userController = require('../controllers/user')

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

router.post('/users/signup', userController.SignUp);

router.post('/users/login', userController.Login);

module.exports = router;


  