const config = require("../../config/auth.config");

const { User, schema } = require("../models/user.models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 9),
  })
    .then(() => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found!" });
      }
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign({ id: user._id }, config.secret);

      res.status(200).send({
        userId: user.id,
        name: user.name,
        email: user.email,
        token: token,
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
