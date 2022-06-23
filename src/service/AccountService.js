const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.findAll = async (filter = {}) => {
    return await prisma.account.findMany
}

exports.createAccount = async ({ name, user_id }) => {
    return await prisma.account.create({
        data: {
            name,
            userId: user_id
        }
    })
}
