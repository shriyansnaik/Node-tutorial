const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const users = require("../datastore/users.datastore");

const createUser = async (req, res) => {
  const newUser = req.body;

  // Check if an user with provided username or email exists
  const user = users.find((item) => item.username == req.body.username);
  const email = users.find((item) => item.email == req.body.email);
  if (user) return res.send("Username exists");
  if (email) return res.send("Email exists");

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  // Generate a unique user ID
  newUser.id = uuidv4();

  // Save the user in your data store (e.g., an array)
  users.push(newUser);

  res.send("User registered securely!");
};

const getUsers = (req, res) => {
  res.send(users);
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  // Check if user with provided ID exists
  const user = users.find((item) => item.id == userId);
  if (!user) return res.status(400).send("No user with this ID.");

  // Update all the fields that have been passed in the body
  for (update in updatedData) user[update] = updatedData[update];

  res.send("User updated successfully");
};

const deleteUser = (req, res) => {
    const userId = req.params.id;
  
    const userIndex = users.findIndex((item) => item.id == userId);
    if (userIndex == -1)
      return res.status(404).send("User with given ID does not exist");
  
    users.splice(userIndex, 1);
  
    res.send("User deleted successfully");
  }

module.exports = { createUser, getUsers, updateUser, deleteUser };
