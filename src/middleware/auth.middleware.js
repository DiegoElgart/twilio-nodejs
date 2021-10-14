const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Acces denied. No Token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid token");
  }
};
