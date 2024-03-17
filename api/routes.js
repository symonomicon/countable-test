const express = require("express");
const userController = require('./controllers/user')

const router = express.Router();

router.route("/user")
    .post(userController.createUser);
router.route("/user/:email")
    // Get a product by ID
    .get(userController.getUser)

module.exports = router;