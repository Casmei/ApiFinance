const service = require('../service/UserService');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');


exports.singin = async (req, res, next) => {
    const user = await service.findOne({ email: req.body.email });
    try {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            // TODO Criar um Env da Secret Key
            const token = jwt.encode(payload, '$3dsFs')
            console.log(token)
            res.status(200).json({ token })
        }
    } catch (err) {
        next(err)
    }
};
