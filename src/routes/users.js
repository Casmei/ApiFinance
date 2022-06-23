const controllerUser = require('../controllers/UsersController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(controllerUser.allUsers)
    .post(controllerUser.createUser);

module.exports = router;
