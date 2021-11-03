const { User, schema } = require("../models/user.models");

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! This Email is already in use!",
      });
      return;
    }
    next();
  });
};

const verifySingUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySingUp;
