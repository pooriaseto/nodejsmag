const { Post, Category } = require("../models/db");
const { PostsPageSize } = require("../config/public");
const DateTime = require("../utils/dateTime");

class HomeController {
  async index(req, res) {
    let query = await Post.findAndCountAll({
      include: {
        model: Category,
        as: "categories",
        attributes: ["title", "slug", "parentId", "id"],
        required: true,
      },
      attributes: ["title", "slug", "imageUrl", "creation_time"],
      order: [["creation_time", "DESC"]],
      limit: PostsPageSize,
      offset: 0,
    });

    let subjects = await Category.findAll({
      attributes: ["title", "slug", "imageUrl"],
      limit: 6,
      offset: 0,
    });

    res.status(200).render("index", {
      title: "index",
      posts: query.rows,
      subjects,
      convertToPersianDate: DateTime.convertToPersianDate,
    });
  }
}

module.exports = new HomeController();
