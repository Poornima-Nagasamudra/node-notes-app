const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/Users");
const tokenGeneration = (req, res, next) => {
  const body = req.body;
  User.findOne({ email: body.email }).then((user) => {
    if (!user) {
      res.json({ errors: "Invalid Email or Password" });
    } else {
      bcryptjs.compare(body.password, user.password).then((match) => {
        if (match) {
          const tokendata = {
            _id: user._id,
            email: user.email,
            userName: user.userName,
            role: user.role,
          };
          const token = jwt.sign(tokendata, "dct123");
          //res.json({ token: `Bearer ${token}` });
          req.tokenData = { token: `Bearer ${token}` };
          next();
        } else {
          res.json({ errors: "Invalid Email or Password" });
        }
      });
    }
  });
};
module.exports = tokenGeneration;
