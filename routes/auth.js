const express = require("express");
const Admin = require("../model/admin");
require("dotenv/config");

const router = express.Router();

router.post("/login", (req, res) => {
  Admin.find({ email: req.body.email })
    .then(async (user) => {
      if (user.length === 0) {
        return res
          .json({
            user: null,
            message: "No account found with email " + req.body.email,
          })
          .status(404);
      }
      if (user[0].password === req.body.password) {
        delete user[0].password;
        return res
          .json({
            user: user[0],
            message: "Login Successfull",
          })
          .status(200);
      } else {
        return res
          .json({ user: null, message: "Invalid Password!" })
          .status(400);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ user: null, message: "Server error, Try again later!" }).status(500);
    });
});

// signup
router.post("/signup", (req, res) => {
  const user = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user
    .save()
    .then((user) => {
      if (user._id) {
        delete user['password'];
        return res
          .json({ user: user, message: "Admin added successfully!" })
          .status(200);
      }
      return res
        .json({
          user: null,
          message: "Admin failed to Create!",
        })
        .status(400);
    })
    .catch((err) => {
      console.log(err);
      return res
        .json({
          user: null,
          message: `Server error, Try again later!`,
        })
        .status(500);
    });
});

module.exports = router;
