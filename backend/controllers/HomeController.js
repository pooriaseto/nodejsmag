const {Post,Category} = require("../models/db");

class HomeController {
  async index(req, res) {
    let posts = await Post.findAll().then(posts=>res.json(posts));
    let subjects = await Category.findMainCats();
    res.status(200).render("index", { title: "index", posts, subjects });
  }
}

module.exports = new HomeController();
