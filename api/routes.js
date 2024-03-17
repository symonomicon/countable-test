const express = require("express");
const userController = require('./controllers/user')
const timeController = require('./controllers/time')
const projectController = require('./controllers/project')



const router = express.Router();

router.route("/user")
    .post(userController.createUser)
    .get(userController.getUser)
router.route("/user/login")
    .post(userController.login)

router.route("/time")
    .post(timeController.upsertTime)
    .put(timeController.upsertTime)
    .get(timeController.getTime)

router.route("/project")
    .get(projectController.getProject)
router.route("/project/:projectName")
    .get(projectController.getProject)

module.exports = router;