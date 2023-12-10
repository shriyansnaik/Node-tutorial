const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = require("../datastore/users.datastore");
const { secretKey } = require("../config");

const login = async (req, res) => {
  const user = users.find((item) => item.email == req.body.email);
  if (!user) return res.send("This email is not registered.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.send("Invalid credentials!");

  const token = jwt.sign({ id: user.id }, secretKey);

  res.send({
    message: "You have logged in successfully!!",
    x_auth_token: token,
  });
};

module.exports = { login };
