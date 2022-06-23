const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.createAccount = async ({ name, user_id }) => {
    return await prisma.account.create({
        data: {
            name,
            userId: user_id
        }
    })
}
