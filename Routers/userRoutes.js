const express = require("express");
const routes = express.Router();
const User = require("../data/helpers/userDb");

routes.use(express.json());

routes.post("/", (req, res) => {
  if(!req.body.name){
    res.status(400).json({message: "A name is required to do this request"})
  }else {
    User.insert(req.body)
    .then(data => {
      if (data) {
        res.status(201).json(data);
      } else {
        res.status(409).json({ message: "Username is alreay taken" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Server error", error: err });
    });
  }
 
});

routes.get("/", (req, res) => {
  User.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "server error", error: err });
    });
});

module.exports = routes;
