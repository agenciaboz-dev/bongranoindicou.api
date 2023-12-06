import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler";
import { NewUser, Referral } from "../definitions/userOperations";
import Hashids from "hashids";
import { sendMail } from "../scripts/mail"
import { verification_email } from "../templates/email/verification"

const hashid = {
    verification: new Hashids("bunda", 5),
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

const verify = async (socket: Socket, id: number) => {
  try {
    // Check if the user exists
    const user = await databaseHandler.user.exists(id);

    if (!user) {
      // If the user doesn't exist, emit an error event
      socket.emit("application:aproval:error", {
        error: "User not found",
      });
      return;
    }

    // Check if the user is already verified
    if (user.verified) {
      // If the user is already verified, emit an error event
      socket.emit("application:aproval:error", {
        error: "User is already verified",
      });
      return;
    }

    // FALTANDO LÓGICA DE VERIFICAÇÃO DO CODIGO DE VERIFICAÇÃO ENVIADO NO EMAIL

    // Update the user's verification status to true
    await databaseHandler.user.verify(id);
    // Emit a successful verification event
    socket.emit("application:status:approved", {
      message: "Your account has been verified.",
    });
  } catch (error: any) {
    console.log(error);

    // Emit a generic error event if there's an issue with verification
    socket.emit("application:aproval:error", {
      error: "Verification Error",
    });
  }
};

const createReferral = async (socket: Socket, data: Referral) => {
  try {
    console.log(data);
    const user = await databaseHandler.user.referral(data);
    // Emit success event
    socket.emit("referral:registration:success", user);
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002" && error.meta) {
      // Mapping field errors to error messages
      const fieldErrorMap: any = {
        email: "Email already exists.",
      };
      // Check which field caused the error
      for (const field in fieldErrorMap) {
        if (error.meta.target.includes(field)) {
          socket.emit("user:registration:failed", {
            error: fieldErrorMap[field],
          });
          break;
        }
      }
    }
  }
};

export default { list, create, createReferral, verify };
