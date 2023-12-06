import { User, PrismaClient } from "@prisma/client";
import { NewUser, Referral } from "../definitions/userOperations";

const prisma = new PrismaClient();

// Função para listar todos os CLIENTES, omitindo informações sensíveis.
const list = async () => {
  const users = await prisma.user.findMany({
    include: {
      referredFriends: true,
    },
  });

  return users;
};

// Função de criação de novos CLIENTES.
const create = async (data: NewUser) => {
  console.log("Iniciando a criação do usuário...");

  return await prisma.user.create({
    data: {
      name: data.name,
      address: data.address,
      number: data.number,
      cep: data.cep,
      adjunct: data.adjunct,
      email: data.email,
      whatsapp: data.whatsapp,
      verified: data.verified,
      date: data.date,
      verificationCode: data.verificationCode,
      booked: data.booked,
    },
  });
};

const verify = async (id: number) => {
  return await prisma.user.update({
    where: { id },
    data: {
      verified: true,
    },
  });
};

const exists = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const referral = async (data: Referral) => {
  console.log("Iniciando a criação do usuário referal...");
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      referredBy: {
        connect: { id: data.referredById },
      },
    },
  });
};

export default { list, create, verify, exists, referral };
// export default { selections, list, create, exists };
