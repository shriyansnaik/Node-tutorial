const express = require("express");
const router = express.Router();

const authenticationMiddleware = require("../middleware/authentication.middleware");
const authorizationMiddleware = require("../middleware/authorization.middleware");

const userControllers = require("../controllers/users.controllers");

router.post("/", userControllers.createUser);

router.get("/", authenticationMiddleware.authentication, userControllers.getUsers);

router.put("/:id", authenticationMiddleware.authentication, authorizationMiddleware.authorization, userControllers.updateUser);

router.delete("/:id", authenticationMiddleware.authentication, userControllers.deleteUser);

module.exports = router;
