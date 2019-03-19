function upperCaseName(req, res, next){
  if((req.method==="POST"||req.method==="PUT") && req.body){
    req.body.name = req.body.name.toUpperCase();
  }
  next()
}

module.exports = upperCaseName;