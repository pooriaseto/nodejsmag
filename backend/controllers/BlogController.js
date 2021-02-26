const Post = require("../models/post");
const DateTime = require("../utils/dateTime");
class BlogController
{
    async singlePost(req, res) {
        const slug = req.params.slug;
        let post = await Post.findBySlug(slug);
        post.creation_time = DateTime.convertToPersianDateTime(post.creation_time);
        res.status(200).render("singlePost", { title: post.title , post })
    };
}

module.exports = new BlogController;