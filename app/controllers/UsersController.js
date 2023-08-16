const User = require("../Models/Users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userController = {};

userController.register = (req, res) => {
  const body = req.body;
  //sanitize incoming json data
  delete body.role; //deleting the role for security purpose
  User.create(body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.json({
          errors: "Email is already present",
        });
      } else {
        res.json(err);
      }
    });
};

userController.login = (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email }).then((user) => {
    if (!user) {
      res.json({ errors: "Invalid Email or Password" });
    }

    bcryptjs.compare(body.password, user.password).then((match) => {
      if (match) {
        const tokendata = {
          _id: user._id,
          email: user.email,
          userName: user.userName,
        };
        const token = jwt.sign(tokendata, "dct123");
        res.json({ token: `Bearer ${token}` });
      } else {
        res.json({ errors: "Invalid Email or Password" });
      }
    });
  });
  res.json(req.tokenData);
};

userController.account = (req, res) => {
  res.json(req.user);
};

userController.list = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = userController;
