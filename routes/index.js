var express = require('express');
var router = express.Router();

const postsController = require("../controllers/PostsController");

router.get("/", postsController.findAll);

router.get('/single-post', function (req, res, next) {
  res.render('singlePost', { title: 'aboutUs' });
});


router.get('/contact-us', function (req, res, next) {
  res.render('contactUs', { title: 'contactUs' });
});

router.get('/about-us', function (req, res, next) {
  res.render('aboutUs', { title: 'aboutUs' });
});

router.all("*", (req, res, next) => {
  res.render('notFound', { title: 'notfound' });
});


module.exports = router;
