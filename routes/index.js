var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Site' });
});

router.get('/about-us', function (req, res, next) {
  res.render('aboutUs', { title: 'AbousUs' });
});

module.exports = router;
