const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient
exports.findAll = async () => {
    return await prisma.user.findMany();
}

exports.createUser = async ({ name, email, password }) => {
    return await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
}
