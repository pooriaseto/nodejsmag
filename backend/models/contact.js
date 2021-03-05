module.exports = (sequelize, type) => {
  return sequelize.define(
    "contacts",
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
      status: type.BOOLEAN,
    },
    {
      timestamps: false,
    }
  );
};
