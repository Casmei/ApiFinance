const controller = require('../controllers/UsersController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(controller.allUsers)
    .post(controller.createUser);

module.exports = router;
