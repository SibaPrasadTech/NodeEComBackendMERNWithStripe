const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader) return res.status(401).json("You are not authenticated")
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SEC, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!!!")
    // we have req.body and req.headers. here we are creating req.user
    req.user = user;
    next();
  })
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    }
    else {
      res.status(403).json("You are not authorised to perform this action!!!");
    }
  })
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    }
    else {
      res.status(403).json("You are not authorised to perform this action!!!");
    }
  })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };