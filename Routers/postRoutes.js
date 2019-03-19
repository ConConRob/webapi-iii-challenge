const express = require("express");
const routes = express.Router();
const Posts = require("../data/helpers/postDb");

routes.use(express.json());

routes.post("/", (req, res) => {
  const { text, user_id } = req.body;
  if (!text || !user_id) {
    res.status(400).json({ message: "A text and a user_id is required" });
  } else {
    Posts.insert(req.body)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(500).json({ message: "Server error", error: err });
      });
  }
});

routes.get("/", (req, res) => {
  Posts.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({ message: "Server error", error });
    });
});

routes.get("/:id", (req, res) => {
  Posts.getById(req.params.id).then(data => {
    if (!data) {
      res.status(404).json({ message: "That post does not exist" });
    } else {
      res.status(200).json(data);
    }
  }).catch(error => {
    res.status(500).json({message:"Server error", error})
  })
});

module.exports = routes;
