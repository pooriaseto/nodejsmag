module.exports = (sequelize, type) => {
  return sequelize.define(
    "postscategories",
    {
      postId: {
        type: type.INTEGER,
        primaryKey: true,
      },
      categoryId: {
        type: type.INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
