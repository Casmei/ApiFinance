const express = require('express');
const passport = require('../config/passport');

const controllerUser = require('../controllers/UsersController');


const router = express.Router();

router.route('/')
    .all(passport.authenticate())
    .get(controllerUser.allUsers)
    .post(controllerUser.createUser);

module.exports = router;
