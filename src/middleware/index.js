const authJwt = require("./auth.middleware");
const verifySingUp = require("./verifySingUp");

module.exports = {
  authJwt: authJwt,
  verifySingUp: verifySingUp,
};
