const { PrismaClient } = require("@prisma/client");
const validationError = require("../errors/ValidationError")

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
    if (!name) throw new validationError("Nome é um atributo obrigatório")
    if (!email) throw new validationError("Email é um atributo obrigatório")
    if (!password) throw new validationError("Senha é um atributo obrigatório")

    const user = await this.findAll(email)
    if (user && user.length > 0) throw new validationError("Já existe um usuário com este email")
    return await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
}
