const sql = require("./db.js");

// constructor
class Category {
  constructor(category) {
    this.id = category.id;
    this.title = category.title;
    this.slug = category.slug;
    this.description = category.title;
    this.imageUrl = category.imageUrl;
    this.visit = category.visit;
    this.like = category.like;
    this.creation_time = category.creation_time;
    this.modification_time = category.modification_time;
  }
  static create(newCategory, result) {
    sql.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newCategory });
    });
  }
  static findById(categoryId, result) {
    sql.query(
      `SELECT * FROM categories WHERE id = ${categoryId}`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          result(null, res[0]);
          return;
        }

        // not found Category with the id
        result({ kind: "not_found" }, null);
      }
    );
  }

  static async findMainCats() {
    const [rows] = await sql.execute(
      "SELECT c.title, c.slug, c.parentId FROM categories as c WHERE c.parentId = 0"
    );
    return rows;
  }

  static async findAll() {
    const [rows] = await sql.execute(
      "SELECT c.title, c.slug, c.parentId FROM categories as c"
    );
    return rows;
  }
  static updateById(id, category, result) {
    sql.query(
      "UPDATE categories SET email = ?, name = ?, active = ? WHERE id = ?",
      [category.email, category.name, category.active, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Category with the id
          result({ kind: "not_found" }, null);
          return;
        }

        result(null, { id: id, ...category });
      }
    );
  }
  static remove(id, result) {
    sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Category with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res);
    });
  }
  static removeAll(result) {
    sql.query("DELETE FROM categories", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  }
}

module.exports = Category;