const {Post,Category} = require("../models/db");

class HomeController {
  async index(req, res) {
    let posts = await Post.findAll();
    console.log(posts);
    let subjects = await Category.findMainCats();
    res.status(200).render("index", { title: "index", posts, subjects });
  }
}

module.exports = new HomeController();
