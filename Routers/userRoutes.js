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
        res.status(409).json({ message: "Username is already taken" });
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

routes.get("/:id", (req, res) => {
  User.getById(req.params.id)
    .then(data => {
      if(!data){
        res.status(404).json({message: "That user does not exist"})
      }else {
        res.status(200).json(data)
      }
    }).catch( err => {
      res.status(500).json({message: "server error", error: err})
    })
})

routes.delete("/:id", (req, res) => {
  

  User.remove(req.params.id)
  .then( data => {
    if(!data){
      res.status(404).json({message: "That user does not exist"})
    }else {
      res.status(202).json({message: "User was deleted", id: req.params.id})
    }
  })
  .catch( err => {
    res.status(500).json({message: "server error", error: err})
  })
})

routes.put("/:id", (req, res) => {
  
  if(!req.body.name){
    res.status(400).json({message: "A name is required to do this request"})
  }else {
    User.update(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.status(201).json(data);
      } else {
        res.status(404).json({ message: "User does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Server error", error: err });
    });
  }

})

routes.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  // Check if user with id exists.
  User.getUserPosts(id)
  .then(data => {
    res.status(200).json(data);
  })
  // ADD .catch
}) 
module.exports = routes;
