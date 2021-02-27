module.exports = (sequelize, type) => {
    return sequelize.define('posts', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: type.STRING,
        slug: type.STRING,
        imageUrl: type.STRING,
        creation_time: type.DATE,
        modification_time: type.DATE,
        visit: type.INTEGER,
        like: type.INTEGER
    })
}