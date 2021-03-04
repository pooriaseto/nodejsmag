const { Post, Category, Comment, PostsCategories } = require("../models/db");

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

    let maincategory = await Category.findOne({
      where: { slug: slug },
      attributes: ["id", "title", "slug", "imageUrl"],
    });

    if (!maincategory) {
      res.statusCode = 404;
      next();
    }

    let posts = await Post.findAll({
      offset: 0,
      limit: 1,
      attributes: ["title", "slug", "imageUrl", "creation_time"],
      order: [["creation_time", "DESC"]],
      include: [
        {
          model: PostsCategories,
          where: { categoryId: maincategory.id },
        },
        {
          model: Category,
          as: "categories",
          attributes: ["title", "slug", "parentId"],
        },
      ],
    });

    res.render("category", {
      maincategory,
      title: maincategory.title,
      posts,
      convertToPersianDate: DateTime.convertToPersianDate,
    });
  }

  async subCategory(req, res, next) {
    const mainCategorySlug = req.params.mainCategorySlug;
    const subCategorySlug = req.params.subCategorySlug;

    let maincategory = await Category.findOne({
      where: { slug: mainCategorySlug },
      attributes: ["title", "slug"],
    });

    if (!maincategory) {
      res.statusCode = 404;
      next();
    }

    let subcategory = await Category.findOne({
      where: { slug: subCategorySlug },
      attributes: ["id", "title", "slug", "imageUrl"],
    });

    //redirect user to 404 page when subcategory is not exist or
    //subcategory is not child of maincategory
    if (!subcategory || subcategory.parentId !== maincategory.id) {
      res.statusCode = 404;
      next();
    }

    let posts = await Post.findAll({
      offset: 0,
      limit: 1,
      attributes: ["title", "slug", "imageUrl", "creation_time"],
      order: [["creation_time", "DESC"]],
      include: [
        {
          model: PostsCategories,
          where: { categoryId: subcategory.id },
        },
        {
          model: Category,
          as: "categories",
          attributes: ["title", "slug", "parentId"],
        },
      ],
    });

    //redirect user to 404 page when subcategory doesn't have post.
    if (!posts || posts.length === 0) {
      res.statusCode = 404;
      next();
    }

    res.render("category", {
      maincategory,
      subcategory,
      title: subcategory.title,
      posts,
      convertToPersianDate: DateTime.convertToPersianDate,
    });
  }
}

module.exports = new BlogController();
