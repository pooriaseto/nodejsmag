const Post = require("../models/post");
const Category = require("../models/category");

class HomeController {
    async create(req, res) {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        // Create a Post
        const post = new Post({
            email: req.body.email,
            name: req.body.name,
            active: req.body.active
        });

        // Save Post in the database
        Post.create(post, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Post."
                });
            else res.send(data);
        });
    };

    async index(req, res) {
        let posts = await Post.getAll();
        let categories = await Category.getAll();
        console.log(posts[0]);
        res.status(200).render("index", { title: "index", posts , categories })
    };

    async findOne(req, res) {
        Post.findById(req.params.customerId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Post with id ${req.params.customerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving Post with id " + req.params.customerId
                    });
                }
            } else res.send(data);
        });
    };

    async update(req, res) {
        // Validate Request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        Post.updateById(
            req.params.customerId,
            new Post(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found Post with id ${req.params.customerId}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating Post with id " + req.params.customerId
                        });
                    }
                } else res.send(data);
            }
        );
    };

    async delete(req, res) {
        Post.remove(req.params.customerId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Post with id ${req.params.customerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete Post with id " + req.params.customerId
                    });
                }
            } else res.send({ message: `Post was deleted successfully!` });
        });
    };

}

module.exports = new HomeController;