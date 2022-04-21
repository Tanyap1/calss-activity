var express = require('express');
var router = express.Router();
const upload = require('express-fileupload')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'fileupload' });
});

module.exports = router;
