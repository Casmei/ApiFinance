const { PrismaClient } = require("@prisma/client");
const validationError = require("../errors/ValidationError");
const bcrypt = require('bcrypt-nodejs');

const prisma = new PrismaClient

exports.findAll = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
        }
    });
}

exports.findOne = async (filter = {}) => {
    return await prisma.user.findFirst({ where: filter });
}

const getPswHash = (pwd) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pwd, salt);
}

exports.createUser = async ({ name, email, password }) => {
    if (!name) throw new validationError("Nome é um atributo obrigatório")
    if (!email) throw new validationError("Email é um atributo obrigatório")
    if (!password) throw new validationError("Senha é um atributo obrigatório")

    const user = await this.findOne({ email: email })
    if (user) throw new validationError("Já existe um usuário com este email")
    newPassword = getPswHash(password);

    return await prisma.user.create({
        select: {
            id: true,
            name: true,
            email: true
        },
        data: {
            name,
            email,
            password: newPassword
        }

    })
}
