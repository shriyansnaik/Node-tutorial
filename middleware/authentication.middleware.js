const jwt = require("jsonwebtoken");
const { secretKey } = require('../config');

const authentication = (req, res, next) => {
  const token = req.header("x_auth_token");
  if (!token)
    return res.status(401).send("Access Denied. Authentication token missing.");

  try {
    const decoded = jwt.verify(token, secretKey);
    req.token_owner_id = decoded.id;
    next();
  } catch (err) {
    res.status(403).send("Access Denied. Token is invalid.");
  }
};

module.exports = { authentication };
