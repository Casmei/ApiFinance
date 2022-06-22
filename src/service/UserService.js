const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient
exports.findAll = async (filter = {}) => {
    return await prisma.user.findMany(
        {
            where: {
                email: filter
            }
        }
    );
}

exports.createUser = async ({ name, email, password }) => {
    if (!name) return { error: "Nome é um atributo obrigatório" }
    if (!email) return { error: "Email é um atributo obrigatório" }
    if (!password) return { error: "Senha é um atributo obrigatório" }

    const user = await this.findAll(email)
    if (user && user.length > 0) return { error: "Já existe um usuário com este email" }
    return await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
}
