const service = require('../service/AccountService')

exports.findAll = async (req, res) => {
    const result = await service.findAll();
    return res.status(200).json(result);
};

exports.findById = async (req, res) => {
    const id = req.params;
    const result = await service.findById(id);
    return res.status(200).json(result);
};

exports.createAccount = async (req, res, next) => {
    try {
        const result = await service.createAccount(req.body);
        return await res.status(201).json(result);
    } catch (err) {
        return next(err);
    }
};

exports.updateById = async (req, res) => {
    const result = await service.updateById(req.params, req.body);
    return await res.status(200).json(result);
};

exports.deleteById = async (req, res) => {
    const result = await service.deleteAccount(req.params);
    return await res.status(204).json(result);

};
