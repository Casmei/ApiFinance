const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.indexPage = async (req, res) => {
    res.status(200).send({ 'message': 'Welcome to the index page' });
};

exports.allUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
};

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });
    res.status(201).json(user);
};

