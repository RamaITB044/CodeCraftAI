const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login successful", user: user });
      } else {
        res.send({ message: "Password did not match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (err) {
    res.send(err);
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, mobileNumber } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
        mobileNumber,
      });
      await user.save();
      res.send({ message: "Successfully registered. Please log in." });
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
