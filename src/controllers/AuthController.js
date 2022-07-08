const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

const validationError = require("../errors/ValidationError");
const service = require('../service/UserService');

exports.singin = async (req, res, next) => {
    const user = await service.findOne({ email: req.body.email });

    try {
        if (!user) throw new validationError('Senha ou Usuário inválidos');
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            const token = jwt.encode(payload, process.env.SECRET_KEY);
            res.status(200).json({ token });
        } else throw new validationError('Senha ou Usuário inválidos');
    }
    catch (err) {
        next(err)
    }
};
