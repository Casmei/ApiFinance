var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.status(200).send();
});

router.get('/users', (req, res) => {
    const users = [
        {
            name: "Jonh Doe",
            mail: "jonh@mail.com"
        }
    ]

    res.json(200, users);

})

module.exports = router;
