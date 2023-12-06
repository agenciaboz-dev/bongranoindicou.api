import { User } from "@prisma/client";
import { type } from "os";

export declare interface NewUser {
  name: string;
  address: string;
  number: string;
  cep: string;
  adjunct: string;
  email: string;
  whatsapp: string;
  verified: boolean;
  verificationCode: string;
  date: string;
  booked: boolean;
}

export declare interface Referral {
  name: string;
  email: string;
  whatsapp: string;
  referredById: number;
}
