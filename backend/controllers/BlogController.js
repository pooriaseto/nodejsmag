const Post = require("../models/post");
const DateTime = require("../utils/dateTime");

class BlogController {
  async singlePost(req, res) {
    const slug = req.params.slug;

    let post = await Post.findBySlug(slug);
    let postCategories = await Post.findCategories(post.id);

    post.creation_time = DateTime.convertToPersianDateTime(post.creation_time);

    let mainCat = postCategories.find((pc) => pc.parentId === 0);
    let subCat = postCategories.find((pc) => pc.parentId !== 0);

    let relatedPosts = await Post.findRelated();
    relatedPosts = relatedPosts.map(item =>{
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
