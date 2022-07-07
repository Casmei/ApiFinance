const service = require('../service/UserService');

exports.indexPage = async (req, res) => {
    res.status(200).send({ 'message': 'Welcome to the index page' });
};

exports.allUsers = async (req, res) => {
    const users = await service.findAll();
    res.status(200).json(users);
};

exports.createUser = async (req, res, next) => {
    try {
        const user = await service.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        return next(err);
    }
};
