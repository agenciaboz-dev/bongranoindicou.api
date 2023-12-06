import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler"
import Hashids from "hashids";
import { sendMail } from "../scripts/mail"
import { verification_email } from "../templates/email/verification"

const hashid = {
    verification: new Hashids("bunda", 5, "QWERTYUIOPASDFGHJKLZXCVBNM"),
    referral: new Hashids("bunda", 20)
}

const list = async (socket: Socket) => {
    try {
        const customer = await databaseHandler.user.list()
        socket.emit("customer:list", customer)
    } catch (error) {
        console.error(`Error fetching customer list`)
        console.log(error)
        socket.emit("customer:list:error", { error })
    }
}

const create = async (socket: Socket, data: NewUser) => {
    try {
        const user = await databaseHandler.user.create(data)

        const encodedId = hashid.verification.encode(user.id)

        socket.emit("user:registration:success", user)

        const email_response = await sendMail(user.email, "Código de verificação", encodedId, verification_email(encodedId))
        console.log(email_response)
    } catch (error: any) {
        console.log(error)
        if (error.code === "P2002" && error.meta) {
            // Mapping field errors to error messages
            const fieldErrorMap: any = {
                email: "Email already exists."
            }
            // Check which field caused the error
            for (const field in fieldErrorMap) {
                if (error.meta.target.includes(field)) {
                    socket.emit("user:registration:failed", {
                        error: fieldErrorMap[field]
                    })
                    break
                }
            }
        }
    }
}

const verify = async (socket: Socket, id: number, code: string) => {
    try {
        // Check if the user exists
        const user = await databaseHandler.user.exists(id)

        if (!user) {
            // If the user doesn't exist, emit an error event
            socket.emit("application:aproval:error", {
                error: "User not found"
            })
            return
        }

        // FALTANDO LÓGICA DE VERIFICAÇÃO DO CODIGO DE VERIFICAÇÃO ENVIADO NO EMAIL
        const decoded = hashid.verification.decode(code)
        if (Number(decoded) != user.id) {
            socket.emit("application:aproval:error", { error: "código inválido" })
            return
        }

        await databaseHandler.user.verify(user.id)

        socket.emit("application:status:approved", {
            message: "Your account has been verified."
        })
    } catch (error: any) {
        console.log(error)

        // Emit a generic error event if there's an issue with verification
        socket.emit("application:aproval:error", {
            error: "Verification Error"
        })
    }
}

const createReferral = async (socket: Socket, data: Referral[], referree_id: number) => {
    try {
        console.log(data)

        if (data.length < 3) {
            console.log("vc não tem amigos suficientes, trouxa")
            socket.emit("referral:registration:failed", { error: "there aren't 3 refferrals" })
            return
        }

        const referrals = await Promise.all(
            data.map(async (referral) => {
                const user = await databaseHandler.user.referral(referral, referree_id)
                return user
            })
        )

        socket.emit("referral:registration:success", referrals)
        //
    } catch (error: any) {
        console.log(error)
        if (error.code === "P2002" && error.meta) {
            // Mapping field errors to error messages
            const fieldErrorMap: any = {
                email: "Email already exists."
            }
            // Check which field caused the error
            for (const field in fieldErrorMap) {
                if (error.meta.target.includes(field)) {
                    socket.emit("referral:registration:failed", {
                        error: fieldErrorMap[field]
                    })
                    break
                }
            }
        }
    }
}

const chooseDate = async (socket: Socket, timestamps: { start: string; end: string }, user_id: number) => {
    const start_date = new Date(Number(timestamps.start)).toLocaleDateString("pt-br")
    const end_date = new Date(Number(timestamps.end)).toLocaleDateString("pt-br")

    if (start_date < end_date) {
        console.log("não tem como o fim da data vir antes do começo, ne porra")
        socket.emit("user:date:error", { error: "invalid dates" })
        return
    }

    const user = await databaseHandler.user.updateDates(timestamps.start, timestamps.end, user_id)

    if (!user) {
        socket.emit("user:date:error", { error: "user not found" })
        return
    }

    socket.emit("user:date:success", user)
}

export default { list, create, createReferral, verify, chooseDate }
