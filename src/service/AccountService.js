const { PrismaClient } = require('@prisma/client');
const validationError = require("../errors/ValidationError")

const prisma = new PrismaClient()

exports.findAll = () => {
    const res = prisma.account.findMany();
    return res
}

exports.findById = async (filter) => {
    const res = await prisma.account.findUnique({
        where: {
            id: filter.id
        }
    })
    return res
}

exports.createAccount = async ({ name, user_id }) => {
    if (!name) throw new validationError("Nome é um atributo obrigatório");
    return await prisma.account.create({
        data: {
            name,
            userId: user_id
        }
    })
}

exports.updateById = async ({ id }, { name }) => {
    return await prisma.account.update({
        where: {
            id
        },
        data: {
            name
        }
    })
}

exports.deleteAccount = async ({ id }) => {
    return await prisma.account.delete({
        where: {
            id: id
        }
    })
}
