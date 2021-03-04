const { Category, Post } = require("../models/db");
const { getMainPath } = require("../utils/path");

class AppController {
  async Public(req, res, next) {
    res.locals.app = { host: getMainPath(req) };
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
