// // import normalize from "../io/formatting";
// import { User, PrismaClient } from "@prisma/client";
// import { NewUser } from "../definitions/userOperations";

// const prisma = new PrismaClient();

// // Função para listar todos os CLIENTES, omitindo informações sensíveis.
// const list = async () => {
//   const users = await prisma.user.findMany({});
//   return users;
// };

// // Função de criação de novos CLIENTES.
// const create = async (data: NewUser) => {
//   console.log("Iniciando a criação do usuário...");

//   return await prisma.customer.create({
//     data: {
//       name: data.name,
//       address: data.address,
//       number: data.number,
//       cep: data.cep,
//       adjunct: data.adjunct,
//       email: data.email,
//       whatsapp: data.whatsapp,
//       verified: data.verified,
//       friend1: data.friend1,
//       friend2: data.friend2,
//       friend3: data.friend3,
//       date: data.date,
//       booked: data.booked,
//     },
//   });
// };

// const exists = async (data: NewUser) => {
//   return await prisma.customer.findUnique({
//     where: {
//       email: data.email,
//     },
//   });
// };

// export default { list, create, exists };
// // export default { selections, list, create, exists };
