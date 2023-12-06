import { Socket } from "socket.io";
import { Server as SocketIoServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import user from "./user";

let io: SocketIoServer | null = null;

export const initializeIoServer = (server: HttpServer | HttpsServer) => {
  io = new SocketIoServer(server, {
    cors: { origin: "*" },
    maxHttpBufferSize: 1e8,
  });
};

export const getIoInstance = () => {
  if (!io) {
    throw new Error(
      "Socket.IO has not been initialized. Please call initializeIoServer first."
    );
  }
  return io;
};

export const handleSocket = (socket: Socket) => {
  console.log(`new connection: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`disconnected: ${socket.id}`);
  });

  socket.on("test", (data) => {
    socket.emit("test:response", data.toUpperCase());
    console.log(data);
  });

  socket.on("user:list", () => user.list(socket));
  socket.on("user:create", (data) => user.create(socket, data));
  socket.on("user:verify", (id) => user.verify(socket, id));
  socket.on("user:referral", (data) => user.createReferral(socket, data));
};
