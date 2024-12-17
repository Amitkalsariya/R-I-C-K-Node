var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const USER = require('../models/user');

// Home page - Show all users or filtered by name search
router.get('/', async (req, res, next) => {
  const search = req.query.q;
  let data;

  if (search) {
    data = await USER.find({ name: { $regex: search, $options: 'i' } });
  } else {
    data = await USER.find();
  }
  res.render('index', { data, updateData: {} });
});

// Login page
router.get('/login', async (req, res, next) => {
  res.render('login');
});

// Signup page (renders index with an empty form for new user)
router.get('/signup', async (req, res, next) => {
  res.redirect('/');
});

// Add or update user data
router.post('/add', async (req, res) => {
  if (req.body.id) {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    } else {
      delete req.body.password;
    }
    await USER.findByIdAndUpdate(req.body.id, req.body);
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    await USER.create(req.body);
  }
  res.redirect('/');
});

// Delete a user by ID
router.get('/deleteData', async (req, res) => {
  const dId = req.query.delete;
  await USER.findByIdAndDelete(dId);
  res.redirect('/');
});

// Update user data page
router.get('/updateData/:eid', async (req, res) => {
  const editId = req.params.eid;
  const ufeilds = await USER.findById(editId);
  const data = await USER.find();
  res.render('index', { data: data, updateData: ufeilds });
});

// Login POST request - authenticate user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let data = await USER.findOne({ email: email });

  if (!data) {
    return res.status(400).send('User not found');
  }

  const psmatch = await bcrypt.compare(password, data.password);
  if (psmatch) {
    // On successful login, redirect to home page
    res.send('login sucess');
  } else {
    // If password doesn't match, return an error message
    res.status(400).send('Incorrect password');
  }
});

module.exports = router;
