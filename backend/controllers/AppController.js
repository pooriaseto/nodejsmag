const { mainPath } = require("../config/public");
const { Category, Post } = require("../models/db");

class AppController {
  async Public(req, res, next) {
    res.locals.app = { host: mainPath };
    res.locals.categories = await Category.findAll({
      attributes: ["title", "slug", "parentId", "id"],
      include: {
        model: Post,
        as : "posts",
        required: true,
        attributes : []
      },
    });

    next();
  }
}

module.exports = new AppController();
