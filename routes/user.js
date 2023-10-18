const express = require('express');
const userController = require('../controller/user_controller.js');

const router = express.Router();

router.post("/signup",userController.signUp);
router.post("/signin",userController.login);

module.exports = router;