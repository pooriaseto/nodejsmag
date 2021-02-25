const sql = require("./db.js");

// constructor
class Post {
    constructor(post) {
        this.email = post.email;
        this.name = post.name;
        this.active = post.active;
    }
    static create(newCustomer, result) {
        sql.query("INSERT INTO posts SET ?", newCustomer, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created post: ", { id: res.insertId, ...newCustomer });
            result(null, { id: res.insertId, ...newCustomer });
        });
    }
    static findById(customerId, result) {
        sql.query(`SELECT * FROM posts WHERE id = ${customerId}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found post: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Post with the id
            result({ kind: "not_found" }, null);
        });
    }
    static getAll(result) {
        sql.query("SELECT * FROM posts", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("posts: ", res);
            result(null, res);
        });
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

                console.log("updated post: ", { id: id, ...post });
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

            console.log("deleted post with id: ", id);
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

            console.log(`deleted ${res.affectedRows} posts`);
            result(null, res);
        });
    }
}

module.exports = Post;