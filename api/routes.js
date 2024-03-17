const express = require("express");
const userController = require('./controllers/user')
const timeController = require('./controllers/time')
const projectController = require('./controllers/project')



const router = express.Router();

router.route("/user")
    .post(userController.createUser);
router.route("/user/:email")
    .get(userController.getUser)

router.route("/time")
    .post(timeController.createTime)
    .put(timeController.updateTime)

router.route("/project")
    .get(projectController.getProject)
router.route("/project/:projectName")
    .get(projectController.getProject)

module.exports = router;