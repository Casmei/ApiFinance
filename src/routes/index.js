const express = require('express');
const passport = require('../config/passport');

const controllerAccount = require('../controllers/AccountController');
const controllerAuth = require('../controllers/AuthController');
const controllerUsers = require('../controllers/UsersController');

var router = express.Router();

router.post('/auth/singin', controllerAuth.singin);
router.post('/auth/singup', controllerUsers.createUser);


router.get('/', controllerUsers.indexPage);

router.route('/account')
    .all(passport.authenticate())
    .get(controllerAccount.findAll)
    .post(controllerAccount.createAccount);

router.route('/account/:id')
    .all(passport.authenticate())
    .get(controllerAccount.findById)
    .put(controllerAccount.updateById)
    .delete(controllerAccount.deleteById);


module.exports = router;
