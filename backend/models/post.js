const sql = require("./db.js");

// constructor
class Post {
    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.slug = post.slug;
        this.description = post.title;
        this.imageUrl = post.imageUrl;
        this.visit = post.visit;
        this.like = post.like;
        this.creation_time = post.creation_time;
        this.modification_time = post.modification_time;
    }
    static create(newPost, result) {
        sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newPost });
        });
    }
    static findById(postId, result) {
        sql.query(`SELECT * FROM posts WHERE id = ${postId}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                result(null, res[0]);
                return;
            }

            // not found Post with the id
            result({ kind: "not_found" }, null);
        });
    }

    static async findBySlug(slug) {
        const [rows] = await sql.execute(`SELECT * FROM posts WHERE slug = ?` , [slug]);
        return rows[0];
    }

    static async getAll() {
        const [rows] = await sql.execute("SELECT * FROM posts");
        return rows;
    }
    static updateById(id, post, result) {
        sql.query(
            "UPDATE posts SET email = ?, name = ?, active = ? WHERE id = ?",
            [post.email, post.name, post.active, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found Post with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                result(null, { id: id, ...post });
            }
        );
    }
    static remove(id, result) {
        sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Post with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, res);
        });
    }
    static removeAll(result) {
        sql.query("DELETE FROM posts", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            result(null, res);
        });
    }
}

module.exports = Post;