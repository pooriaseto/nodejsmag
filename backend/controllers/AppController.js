const { Category, Post } = require('../models/db')

class AppController {
  async Public(req, res,next) {
    res.locals.app = { host: req.protocol + "://" + req.get("host") };
    res.locals.categories = Category.findAll().then(cats =>res.json(cats))
    next();
  }
}

module.exports = new AppController();
