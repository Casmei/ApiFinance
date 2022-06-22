const controllerAccount = require('../controllers/AccountController');
const controllerUsers = require('../controllers/UsersController');
const express = require('express');

var router = express.Router();

router.get('/', controllerUsers.indexPage);
router.get('/account', controllerAccount.indexPage);




// router.route('/account')
//     .post(controller.createAccount);
// .get(controller.allUsers)




module.exports = router;
