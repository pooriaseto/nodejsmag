const Category = require("../models/category");

class AppController {
  async Public(req, res,next) {
    res.locals.app = { host: req.protocol + "://" + req.get("host") };
    res.locals.categories = await Category.findAll();
    next();
  }
}

module.exports = new AppController();
