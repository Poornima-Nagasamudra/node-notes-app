const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const passwordFormat =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "UserName is Required"],
      minLength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: function () {
          return "Email is not valid";
        },
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
      maxLength: 128,
      validate: {
        validator: function (value) {
          return passwordFormat.test(value);
        },
        message: function () {
          return "Password is not valid";
        },
      },
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

userSchema.pre("save", function (next) {
  const body = this;
  bcryptjs.genSalt().then((salt) => {
    //console.log(salt);
    bcryptjs.hash(body.password, salt).then((encrypted) => {
      //console.log(encrypted);
      body.password = encrypted;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
