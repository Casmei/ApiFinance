const service = require('../service/AccountService')

exports.indexPage = (req, res) => {
    return res.status(200);
};

exports.createAccount = async (req, res) => {
    const { name, user_id } = req.body;
    const result = await service.createAccount({ name, user_id });
    //if (account.error) return res.status(400).json(account.error)
    return await res.status(201).json(result);
};
