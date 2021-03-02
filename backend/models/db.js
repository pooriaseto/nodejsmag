const dbConfig = require("../config/db");
const Sequelize = require("sequelize");
const PostModel = require("./post");
const CategoryModel = require("./category");
const PostsCategoriesModel = require("./postscategories");
const CommentModel = require("./comment");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const Post = PostModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const PostsCategories = PostsCategoriesModel(sequelize, Sequelize);

const Comment = CommentModel(sequelize, Sequelize);

Post.belongsToMany(Category, {
  as: "categories",
  through: PostsCategories,
});

Post.hasMany(Comment);

Category.belongsToMany(Post, {
  as: "posts",
  through: PostsCategories,
});

module.exports = {
  Post,
  Category,
  Comment,
};
