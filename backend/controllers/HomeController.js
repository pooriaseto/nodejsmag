const { Op } = require("sequelize");
const { Post, Category } = require("../models/db");
const { PostsPageSize, mainPath } = require("../config/public");
const DateTime = require("../utils/dateTime");

class HomeController {
  async search(req, res, next) {
    let q = req.query.q;
    res.locals.app.q = q;
    if (!q) {
      res.redirect(301, mainPath);
    }

    let posts = await Post.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + q + "%",
            },
          },
          {
            description: {
              [Op.like]: "%" + q + "%",
            },
          },
        ],
      },
      distinct: true,
      attributes: ["title", "slug", "imageUrl", "creation_time"],
      order: [["creation_time", "DESC"]],
      limit: PostsPageSize,
      offset: 0,
      include: {
        model: Category,
        as: "categories",
        attributes: ["title", "slug", "parentId", "id"],
        required: true,
      },
    });

    res.status(200).render("search", {
      title: "جستحوی " + q,
      posts,
      convertToPersianDate: DateTime.convertToPersianDate,
    });
  }

  async index(req, res, next) {
    let query = await Post.findAndCountAll({
      distinct: true,
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
      where: { parentId: 0 },
      attributes: ["title", "slug", "imageUrl"],
      limit: 6,
      offset: 0,
    });

    //show 404 page when maincategory doesn't have post.
    if (!query.rows || query.rows.length === 0) {
      res.statusCode = 404;
      next();
    }

    let pagination = {
      pagesCount: query.count / PostsPageSize,
      activePage: 1,
      mainPath: mainPath,
    };

    let popularPosts = await Post.findAll({
      order: [["like", "DESC"]],
      attributes: ["imageUrl", "title", "slug", "creation_time", "like"],
      limit: 5,
      offset: 0,
      include: [
        {
          model: Category,
          as: "categories",
          attributes: ["title", "slug", "parentId"],
          required: true,
        },
      ],
    });

    let chosenPosts = true;

    res.status(200).render("index", {
      title: "index",
      posts: query.rows,
      subjects,
      pagination,
      popularPosts,
      chosenPosts,
      convertToPersianDate: DateTime.convertToPersianDate,
    });
  }

  async indexPagination(req, res, next) {
    const pageNumber = parseInt(req.params.pageNumber, 10);

    //check nunmber is valid or not
    if (isNaN(pageNumber) || pageNumber < 0) {
      res.statusCode = 404;
      next();
    }

    //prevent from duplicate content
    //we don't have route with pagenumber = 1
    if (pageNumber === 1) {
      res.redirect(301, mainPath);
    }

    let query = await Post.findAndCountAll({
      distinct: true,
      include: {
        model: Category,
        as: "categories",
        attributes: ["title", "slug", "parentId", "id"],
        required: true,
      },
      attributes: ["title", "slug", "imageUrl", "creation_time"],
      order: [["creation_time", "DESC"]],
      offset: PostsPageSize * (pageNumber - 1),
      limit: PostsPageSize,
    });

    //show 404 page when maincategory doesn't have post.
    if (!query.rows || query.rows.length === 0) {
      res.statusCode = 404;
      next();
    }

    let pagination = {
      pagesCount: query.count / PostsPageSize,
      activePage: pageNumber,
      mainPath: mainPath,
    };

    let popularPosts = await Post.findAll({
      order: [["like", "DESC"]],
      attributes: ["imageUrl", "title", "slug", "creation_time", "like"],
      limit: 5,
      offset: 0,
      include: [
        {
          model: Category,
          as: "categories",
          attributes: ["title", "slug", "parentId"],
          required: true,
        },
      ],
    });

    res.status(200).render("index", {
      title: "index",
      posts: query.rows,
      pagination,
      popularPosts,
      convertToPersianDate: DateTime.convertToPersianDate,
    });
  }
}

module.exports = new HomeController();
