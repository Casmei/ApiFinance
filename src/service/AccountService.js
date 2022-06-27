const { PrismaClient } = require('@prisma/client');
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
    return await prisma.account.create({
        data: {
            name,
            userId: user_id
        }
    })
}
