const { Post, Category } = require("../models/db");

class HomeController {
  async index(req, res) {
    let posts = await Post.findAll({
      include: { model: Category, as: "categories" },
    });

    
    let subjects = await Category.findAll();

    res.status(200).render("index", { title: "index", posts, subjects });
  }
}

module.exports = new HomeController();
