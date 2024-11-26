var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This Is Blog Page');
});

router.get('/rick', function(req, res, next) {
  res.send('This Rick Main Page');
});
router.get('/1', function(req, res, next) {
  res.send('First Page');
});
module.exports = router;
