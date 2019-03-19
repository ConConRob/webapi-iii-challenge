const express = require("express");
const routes = express.Router();
const Posts = require("../data/helpers/postDb");

routes.use(express.json());

routes.post('/', (req,res) => {
  const {text, user_id} = req.body;
  if(!text || !user_id){
    res.status(400).json({message: "A text and a user_id is required"});
  }else {
    Posts.insert(req.body)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({message: "Server error", error:err})
      })
  }
})

module.exports = routes;