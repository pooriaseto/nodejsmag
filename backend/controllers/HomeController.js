const { Post, Category } = require("../models/db");

class HomeController {
  async index(req, res) {
    let query = await Post.findAndCountAll({
      include: { model: Category, as: "categories", required: true },
      order: [["creation_time", "DESC"]],
      limit: 1,
      offset: 0,
    });


    let subjects = await Category.findAll();

    res.status(200).render("index", { title: "index", posts: query.rows, subjects });
  }
}

module.exports = new HomeController();
