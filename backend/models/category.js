module.exports = (sequelize, type) => {
  return sequelize.define('categories', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: type.STRING,
    slug: type.STRING,
    imageUrl: type.STRING,
    parentId: type.INTEGER
  })
}