"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocket = exports.getIoInstance = exports.initializeIoServer = void 0;
const socket_io_1 = require("socket.io");
const user_1 = __importDefault(require("./user"));
let io = null;
const initializeIoServer = (server) => {
    io = new socket_io_1.Server(server, {
        cors: { origin: "*" },
        maxHttpBufferSize: 1e8,
    });
};
exports.initializeIoServer = initializeIoServer;
const getIoInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Please call initializeIoServer first.");
    }
    return io;
};
exports.getIoInstance = getIoInstance;
const handleSocket = (socket) => {
    console.log(`new connection: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`disconnected: ${socket.id}`);
    });
    socket.on("test", (data) => {
        socket.emit("test:response", data.toUpperCase());
        console.log(data);
    });
    socket.on("user:list", () => user_1.default.list(socket));
    socket.on("user:create", (data) => user_1.default.create(socket, data));
    socket.on("user:verify", (id) => user_1.default.verify(socket, id));
    socket.on("user:referral", (data) => user_1.default.createReferral(socket, data));
};
exports.handleSocket = handleSocket;
