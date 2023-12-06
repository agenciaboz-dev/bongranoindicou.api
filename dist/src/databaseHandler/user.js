"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Função para listar todos os CLIENTES, omitindo informações sensíveis.
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
        include: {
            referredFriends: true,
        },
    });
    return users;
});
// Função de criação de novos CLIENTES.
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Iniciando a criação do usuário...");
    return yield prisma.user.create({
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
});
const verify = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({
        where: { id },
        data: {
            verified: true,
        },
    });
});
const exists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: { id },
    });
});
const referral = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Iniciando a criação do usuário referal...");
    return yield prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            whatsapp: data.whatsapp,
            referredBy: {
                connect: { id: data.referredById },
            },
        },
    });
});
exports.default = { list, create, verify, exists, referral };
// export default { selections, list, create, exists };
