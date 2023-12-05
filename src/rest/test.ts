import express, { Express, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (request:Request, response:Response) => {    
    response.json({success: true})

})

router.get('/outro', async (request:Request, response:Response) => {    
    response.json({outro: true})

})

router.post('/', async (request:Request, response:Response) => {    
    const data = request.body

    response.json({ postedValues: data })

})

export default router