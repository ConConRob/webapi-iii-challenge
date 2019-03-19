function upperCaseName(req, res, next){
  if((req.method==="POST"||req.method==="PUT") && req.body.name){
    req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
  }
  next()
}

module.exports = upperCaseName;