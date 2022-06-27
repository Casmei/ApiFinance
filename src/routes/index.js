const controllerAccount = require('../controllers/AccountController');
const controllerUsers = require('../controllers/UsersController');
const express = require('express');

var router = express.Router();

router.get('/', controllerUsers.indexPage);

router.route('/account')
    .get(controllerAccount.findAll)
    .post(controllerAccount.createAccount);

router.route('/account/:id')
    .get(controllerAccount.findById)


module.exports = router;
