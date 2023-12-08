import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler";
import Hashids from "hashids";
import { sendMail } from "../scripts/mail";
import { sendSMS } from "../scripts/sms";
import {
  verification_email,
  verification_sms,
} from "../templates/email/verification";
import { referral_email } from "../templates/email/referral";

const hashid = {
  verification: new Hashids("bunda", 5, "QWERTYUIOPASDFGHJKLZXCVBNM"),
  referral: new Hashids("bunda", 20),
};

const handleHash = async (socket: Socket, hash: string) => {
  const id = Number(hashid.referral.decode(hash));
  const user = await databaseHandler.user.find(id);

  if (user) {
    socket.emit("user:hash", user);
  } else {
    socket.emit("user:hash:failed", { error: "usuário não encontrado" });
  }
};

const list = async (socket: Socket) => {
  try {
    const customer = await databaseHandler.user.list();
    socket.emit("customer:list", customer);
  } catch (error) {
    console.error(`Error fetching customer list`);
    console.log(error);
    socket.emit("customer:list:error", { error });
  }
};

const create = async (socket: Socket, data: NewUser, id?: number) => {
  try {
    const user = id
      ? await databaseHandler.user.update(data, id)
      : await databaseHandler.user.create(data);

    const encodedId = hashid.verification.encode(user.id);

    socket.emit("user:registration:success", user);

    const sms_response = await sendSMS(
      user.whatsapp,
      `Seu código de verificação é ${verification_sms(encodedId)}`
    );
    console.log(sms_response);
    console.log({ code: encodedId });

    const email_response = await sendMail(
      user.email,
      "Código de verificação",
      encodedId,
      verification_email(encodedId)
    );
    console.log(email_response);
    console.log({ code: encodedId });
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

const verify = async (socket: Socket, id: number, code: string) => {
  try {
    // Check if the user exists
    const user = await databaseHandler.user.find(id);

    if (!user) {
      // If the user doesn't exist, emit an error event
      socket.emit("application:aproval:error", {
        error: "usuário não encontrado",
      });
      return;
    }

    const decoded = hashid.verification.decode(code);
    if (Number(decoded) != user.id) {
      socket.emit("application:aproval:error", { error: "código inválido" });
      return;
    }

    await databaseHandler.user.verify(user.id);

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

const createReferral = async (
  socket: Socket,
  data: Referral[],
  referree_id: number
) => {
  try {
    const referree = await databaseHandler.user.find(referree_id);

    if (!referree) {
      socket.emit("referral:registration:failed", {
        error: "usuário não encontrado",
      });
      return;
    }

    if (!!referree.referredFriends.length) {
      socket.emit("referral:registration:failed", {
        error: "usuário já indicou",
      });
      return;
    }

    if (data.length < 3) {
      console.log("vc não tem amigos suficientes, trouxa");
      socket.emit("referral:registration:failed", {
        error: "precisa ter 3 indicações",
      });
      return;
    }

    const exist_any = await Promise.all(
      data.map(async (referral) => {
        const user = await databaseHandler.user.exists({
          email: referral.email,
          whatsapp: referral.whatsapp,
        });
        if (user) {
          const error = `${user.name} já cadastrado`;
          socket.emit("referral:registration:failed", { error });
          console.log(error);
          return true;
        }
      })
    );

    if (exist_any.includes(true)) {
      return;
    }

    const referrals = await Promise.all(
      data.map(async (referral) => {
        const user = await databaseHandler.user.referral(referral, referree.id);
        const url = `https://bongrano.agenciaboz.com.br/referree/${hashid.referral.encode(
          user.id
        )}`;
        const email = await sendMail(
          user.email,
          "Indicação",
          url,
          referral_email(url)
        );
        console.log(email);
        return user;
      })
    );

    socket.emit("referral:registration:success", referrals);
    //
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
          socket.emit("referral:registration:failed", {
            error: fieldErrorMap[field],
          });
          break;
        }
      }
    }
  }
};

const chooseDate = async (socket: Socket, date: string, user_id: number) => {
  try {
    const user = await databaseHandler.user.updateDates(date, user_id);

    if (!user) {
      socket.emit("user:date:error", { error: "user not found" });
      return;
    }

    socket.emit("user:date:success", user);
  } catch (error) {
    console.log(error);
    socket.emit("user:date:error", { error });
  }
};

export default { list, create, createReferral, verify, chooseDate, handleHash };
