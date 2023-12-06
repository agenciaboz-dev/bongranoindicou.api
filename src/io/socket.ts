import { Socket } from "socket.io"
import { Server as SocketIoServer } from "socket.io"
import { Server as HttpServer } from "http"
import { Server as HttpsServer } from "https"
import user from "./user"

let io: SocketIoServer | null = null

export const initializeIoServer = (server: HttpServer | HttpsServer) => {
    io = new SocketIoServer(server, {
        cors: { origin: "*" },
        maxHttpBufferSize: 1e8
    })
}

export const getIoInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Please call initializeIoServer first.")
    }
    return io
}

export const handleSocket = (socket: Socket) => {
    console.log(`new connection: ${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`disconnected: ${socket.id}`)
    })

    socket.on("test", (data) => {
        socket.emit("test:response", data.toUpperCase())
        console.log(data)
    })

    socket.on("user:list", () => user.list(socket))
    socket.on("user:create", (data: NewUser) => user.create(socket, data))
    socket.on("user:verify", (data: VerifyForm) => user.verify(socket, data.id, data.code))
    socket.on("user:referral", (data: ReferralForm) => user.createReferral(socket, data.referrals, data.referree_id))
    socket.on("user:date", (data: ChooseDateForm) => user.chooseDate(socket, data.timestamps, data.user_id))
}
