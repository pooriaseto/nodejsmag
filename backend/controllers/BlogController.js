const { Post, Category, Comment, PostsCategories } = require("../models/db");
const { PostsPageSize, mainPath } = require("../config/public");
const DateTime = require("../utils/dateTime");

//TODO: Is there a way that we don't copy mainCategory to mainCategoryPagination?
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
      limit: PostsPageSize,
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

    let getPosts = await Post.findAndCountAll({
      offset: 0,
      limit: PostsPageSize,
      distinct: true,
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

    //show 404 page when maincategory doesn't have post.
    if (!getPosts.rows || getPosts.rows.length === 0) {
      res.statusCode = 404;
      next();
    }

    let pagination = {
      pagesCount: getPosts.count / PostsPageSize,
      activePage: 1,
      mainPath: mainPath + "/" + slug,
    };

    res.render("category", {
      maincategory,
      title: maincategory.title,
      posts: getPosts.rows,
      pagination,
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

    let getPosts = await Post.findAndCountAll({
      offset: 0,
      limit: PostsPageSize,
      distinct: true,
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

    //show 404 page when subcategory doesn't have post.
    if (!getPosts.rows || getPosts.rows.length === 0) {
      res.statusCode = 404;
      next();
    }

    let pagination = {
      pagesCount: getPosts.count / PostsPageSize,
      activePage: 1,
      mainPath: mainPath + "/" + maincategory.slug + "/" + subcategory.slug,
    };

    res.render("category", {
      maincategory,
      subcategory,
      title: subcategory.title,
      posts: getPosts.rows,
      pagination,
      convertToPersianDate: DateTime.convertToPersianDate,
    });
  }

  async mainCategoryPagination(req, res, next) {
    const slug = req.params.mainCategorySlug;
    const pageNumber = parseInt(req.params.pageNumber, 10);

    //check nunmber is valid or not
    if (isNaN(pageNumber) || pageNumber < 0) {
      res.statusCode = 404;
      next();
    }

    //prevent from duplicate content
    //we don't have route with pagenumber = 1
    if (pageNumber === 1) {
      let path = mainPath + "/" + slug;
      res.redirect(301, path);
    }

    let maincategory = await Category.findOne({
      where: { slug: slug },
      attributes: ["id", "title", "slug", "imageUrl"],
    });

    if (!maincategory) {
      res.statusCode = 404;
      next();
    }

    let getPosts = await Post.findAndCountAll({
      offset: PostsPageSize * (pageNumber - 1),
      limit: PostsPageSize,
      distinct: true,
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

    //show 404 page when maincategory doesn't have post.
    if (!getPosts.rows || getPosts.rows.length === 0) {
      res.statusCode = 404;
      next();
    }

    let pagination = {
      pagesCount: getPosts.count / PostsPageSize,
      activePage: pageNumber,
      mainPath: mainPath + "/" + slug,
    };

    res.render("category", {
      maincategory,
      title: maincategory.title,
      posts: getPosts.rows,
      pagination,
      convertToPersianDate: DateTime.convertToPersianDate,
    });
  }

  async subCategoryPagination(req, res, next) {
    const mainCategorySlug = req.params.mainCategorySlug;
    const subCategorySlug = req.params.subCategorySlug;
    const pageNumber = parseInt(req.params.pageNumber, 10);

    //check nunmber is valid or not
    if (isNaN(pageNumber) || pageNumber < 0) {
      res.statusCode = 404;
      next();
    }

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

    //prevent from duplicate content
    //we don't have route with pagenumber = 1
    if (pageNumber === 1) {
      let path = mainPath + "/" + mainCategorySlug + "/" + subCategorySlug;
      res.redirect(301, path);
    }

    let getPosts = await Post.findAndCountAll({
      offset: PostsPageSize * (pageNumber - 1),
      limit: PostsPageSize,
      distinct: true,
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

    //show 404 page when subcategory doesn't have post.
    if (!getPosts.rows || getPosts.rows.length === 0) {
      res.statusCode = 404;
      next();
    }

    let pagination = {
      pagesCount: getPosts.count / PostsPageSize,
      activePage: pageNumber,
      mainPath: mainPath + "/" + maincategory.slug + "/" + subcategory.slug,
    };

    res.render("category", {
      maincategory,
      subcategory,
      title: subcategory.title,
      posts: getPosts.rows,
      pagination,
      convertToPersianDate: DateTime.convertToPersianDate,
    });
  }
}

module.exports = new BlogController();
