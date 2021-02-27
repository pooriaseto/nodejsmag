const { Post, Category } = require("../models/db");

const DateTime = require("../utils/dateTime");

class BlogController {
  async singlePost(req, res) {
    const slug = req.params.slug;

    let post = await Post.findOne({
      where: { slug: slug },
      include: [{ model: Category, as: "categories" }],
    });
    post.creation_time_fa = DateTime.convertToPersianDateTime(
      post.creation_time
    );

    let maincat = post.categories.filter((a) => a.parentId === 0)[0];
    let subcat = post.categories.filter((a) => a.parentId !== 0)[0];

    let relatedPosts = await Post.findAll();
    relatedPosts = relatedPosts.map((item) => {
      item.creation_time_fa = DateTime.convertToPersianDate(item.creation_time);
      return item;
    });

    res.status(200).render("singlePost", {
      title: post.title,
      post,
      maincat,
      subcat,
      relatedPosts,
    });
  }
}

module.exports = new BlogController();
