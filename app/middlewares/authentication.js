const jwt = require("jsonwebtoken");
const User = require("../Models/Users");

const authentication = (req, res, next) => {
  let token = req.header("Auth-X");
  if (token) {
    token = token.split(" ")[1];
    try {
      tokenData = jwt.verify(token, "dct123");
      //console.log(tokenData);
      User.findById(tokenData._id)
        .then((user) => {
          console.log(user);
          req.user = user;
          next();
        })
        .catch((err) => {
          res.json(err);
        });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(401).json({ errors: "Something Wrong with token data" });
  }
};

const authorizeUser = (req, res, next) => {
  if (req.user.role == "admin") {
    next();
  } else {
    res.status(403).json({
      errors: `page you are looking for doesn\`t access.`,
    });
  }
};

module.exports = { authentication, authorizeUser };
