const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user.models");
const auth = require("../middleware/auth.middleware");

// get logged users info (token must be provided)
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  // validate body data
  const { error } = validate(req.body);

  // in case body data is invalid send error message
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // validate user email doesnt exist
  let user = await User.findOne({ email: req.body.email });

  // in case user email already exists send error message
  if (user) {
    return res.status(400).send("User already registered");
  }

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  return res.send(_.pick(user[("_id", "name", "email")]));
});

module.exports = router;
