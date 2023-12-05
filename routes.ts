import express, { Express, Request, Response } from "express"
import test from "./src/rest/test"

export const router = express.Router()

router.use("/test", test)
