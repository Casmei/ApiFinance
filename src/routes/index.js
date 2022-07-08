const controllerAccount = require('../controllers/AccountController');
const controllerAuth = require('../controllers/AuthController');
const controllerUsers = require('../controllers/UsersController');
const express = require('express');

var router = express.Router();

router.post('/auth/singin', controllerAuth.singin)

router.get('/', controllerUsers.indexPage);

router.route('/account')
    .get(controllerAccount.findAll)
    .post(controllerAccount.createAccount);

router.route('/account/:id')
    .get(controllerAccount.findById)
    .put(controllerAccount.updateById)
    .delete(controllerAccount.deleteById);


module.exports = router;
