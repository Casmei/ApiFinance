const Prima = require('@prisma/client')
const prisma = new Prima.PrismaClient()
exports.indexPage = async (req, res) => {
    res.status(200).send();
};

exports.allUsers = async (req, res) => {
    res.status(200).json(result);
};

exports.createUsers = (req, res) => {
    res.status(201).json(req.body);
};
