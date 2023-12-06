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
  friend1: string;
  friend2: string;
  friend3: string;
  date: string;
  booked: boolean;
}
