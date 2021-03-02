const { Post, Category, Comment } = require("../models/db");

const DateTime = require("../utils/dateTime");

class BlogController {
  async singlePost(req, res, next) {
    const slug = req.params.slug;

    let post = await Post.findOne({
      where: { slug: slug },
      include: [
        {
          model: Category,
          as: "categories",
          attributes: ["title", "slug", "parentId"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["name", "description", "creation_time"],
        },
      ],
      attributes: [
        "title",
        "slug",
        "imageUrl",
        "creation_time",
        "modification_time",
        "description",
      ],
    });

    if (!post) {
      res.statusCode = 404;
      next();
    }

    let maincat = post.categories.filter((a) => a.parentId === 0)[0];
    let subcat = post.categories.filter((a) => a.parentId !== 0)[0];

    let relatedPosts = await Post.findAll({
      attributes: ["title", "slug", "creation_time", "imageUrl"],
      order: [["creation_time", "DESC"]],
      limit: 5,
      offset: 0,
    });

    res.status(200).render("singlePost", {
      title: post.title,
      post,
      maincat,
      subcat,
      relatedPosts,
      convertToPersianDateTime: DateTime.convertToPersianDateTime,
      convertToPersianDate: DateTime.convertToPersianDate,
    });
  }

  async mainCategory(req, res, next) {
    const slug = req.params.mainCategorySlug;
    let category = await Category.findOne({
      where: { slug: slug },
      include: [
        {
          model: Post,
          as: "posts",
          attributes: ["id", "title", "slug", "imageUrl", "creation_time"],
          required: true,
          include: {
            model: Category,
            as: "categories",
            attributes: ["title", "slug", "parentId"],
          },
        },
      ],
      attributes: ["title", "slug", "imageUrl"],
    });
    if (!category) {
      res.statusCode = 404;
      next();
    }
    res.render("category", {
      category,
      title: category.title,
      convertToPersianDate: DateTime.convertToPersianDate,
    });
  }

  async subCategory(req, res, next) {
    const slug = req.params.subCategorySlug;
    let category = await Category.findOne({
      where: { slug: slug },
      include: [
        {
          model: Post,
          as: "posts",
          attributes: ["id", "title", "slug", "imageUrl", "creation_time"],
          required: true,
          order: [["creation_time", "DESC"]],
          include: {
            model: Category,
            as: "categories",
            attributes: ["title", "slug", "parentId"],
          },
        },
      ],
      attributes: ["id", "title", "slug", "imageUrl"],
    });

    if (!category) {
      res.statusCode = 404;
      next();
    }
    res.render("category", {
      category,
      title: category.title,
      convertToPersianDate: DateTime.convertToPersianDate,
    });
  }
}

module.exports = new BlogController();
