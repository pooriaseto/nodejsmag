const Post = require("../models/post");
const Category = require("../models/category");

const DateTime = require("../utils/dateTime");

class BlogController {
  async singlePost(req, res) {
    const slug = req.params.slug;

    let query = Post.findAll({ include: Category });

    let posts =  query.then(post => res.json(post))


    post.creation_time = DateTime.convertToPersianDateTime(post.creation_time);

    let mainCat = postCategories.find((pc) => pc.parentId === 0);
    let subCat = postCategories.find((pc) => pc.parentId !== 0);

    let relatedPosts = await Post.findRelated();
    relatedPosts = relatedPosts.map(item => {
      item.creation_time = DateTime.convertToPersianDateTime(item.creation_time);
      return item;
    })

    res.status(200).render("singlePost", {
      title: post.title,
      post,
      postCategories,
      mainCat,
      subCat,
      relatedPosts,
    });
  }
}

module.exports = new BlogController();
