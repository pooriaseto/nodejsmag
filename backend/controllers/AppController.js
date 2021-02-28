const { Category } = require('../models/db')
const cache = require("memory-cache");
class AppController {
  async Public(req, res,next) {
    res.locals.app = { host: req.protocol + "://" + req.get("host") };
    res.locals.categories = await Category.findAll({
      attributes: ["title", "slug" , "parentId" , "id"],
    });
    next();
  }
}

module.exports = new AppController();
