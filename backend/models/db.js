
const dbConfig = require('../config/db');
const Sequelize = require('sequelize');
const PostModel = require('./post')
const CategoryModel = require('./category')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const Post = PostModel(sequelize, Sequelize)
const Category = CategoryModel(sequelize, Sequelize)

Post.belongsToMany(Category, { through: 'postsCategories' });
Category.belongsToMany(Post, { through: 'postsCategories' });

module.exports = {
    Post,
    Category
}