const { verfySingUp } = require("../middleware");
const verifySingUp = require("../middleware/verifySingUp");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/signup", verifySingUp.checkDuplicateEmail, controller.signup);
  app.post("/signin", controller.signin);
};

/* const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User, schema } = require("../models/user.models");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // validate message's body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // validate user exists
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  // validate user's password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  // if user were authenticated
  res.json({ token: user.generateAuthToken() });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(req);
}

module.exports = router;
 */
