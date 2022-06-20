const controller = require('../controllers/UsersController')
var express = require('express');

var router = express.Router();



router.get('/', controller.indexPage);

router.get('/users', controller.allUsers)

router.post('/users', controller.createUsers)

module.exports = router;
