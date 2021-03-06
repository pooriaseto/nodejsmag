module.exports = (sequelize, type) => {
  return sequelize.define(
    "comments",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING,
      email: type.STRING,
      description: type.STRING,
      creation_time: type.DATE,
      postId: type.INTEGER,
    },
    {
      timestamps: false,
    }
  );
};
