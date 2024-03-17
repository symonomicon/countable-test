const express = require("express");
const userController = require('./controllers/user')
const timeController = require('./controllers/time')


const router = express.Router();

router.route("/user")
    .post(userController.createUser);
router.route("/user/:email")
    .get(userController.getUser)

router.route("/time")
    .post(timeController.createTime)
    .put(timeController.updateTime)


module.exports = router;