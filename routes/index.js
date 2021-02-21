var express = require('express');
var router = express.Router();
const axios = require("axios").default;

router.get('/', async function (req, res, next) {

  let posts = await axios.get("http://localhost:8080/posts").then(res => res.data);

  res.render('index', { title: 'index', posts });
});

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
