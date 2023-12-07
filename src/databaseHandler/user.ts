import { User, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const include = { referredFriends: true, referredBy: true }

// Função para listar todos os CLIENTES, omitindo informações sensíveis.
const list = async () => {
    const users = await prisma.user.findMany({
        include: {
            referredFriends: true
        }
    })

    return users
}

// Função de criação de novos CLIENTES.
const create = async (data: NewUser) => {
    console.log("Iniciando a criação do usuário...")

    return await prisma.user.create({
        data: {
            name: data.name,
            address: data.address,
            number: data.number,
            cep: data.cep,
            adjunct: data.adjunct,
            email: data.email,
            whatsapp: data.whatsapp
        }
    })
}

const verify = async (id: number) =>
    await prisma.user.update({
        where: { id },
        data: {
            verified: true
        }
    })

const find = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
        include
    })
}

interface ExistsData {
    id?: number
    whatsapp?: string
    email?: string
}
const exists = async ({ id, email, whatsapp }: ExistsData) =>
    await prisma.user.findFirst({ where: { OR: [{ id }, { email }, { whatsapp }] }, include })

const referral = async (data: Referral, referree_id: number) => {
    console.log("Iniciando a criação do usuário referal...")
    return await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            whatsapp: data.whatsapp,
            referredById: referree_id
        }
    })
}

const updateDates = async (start: string, end: string, id: number) =>
    await prisma.user.update({ where: { id }, data: { date_start: start, date_end: end } })

export default { include, list, create, verify, find, referral, updateDates, exists }
// export default { selections, list, create, exists };
