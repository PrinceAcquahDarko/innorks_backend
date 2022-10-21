import express from 'express'
import dotenv from "dotenv";

dotenv.config();
const app = express()

import cors from 'cors';
import RegisterRouter from './auth/register/route.js'
import LoginRouter from './auth/login/route.js'
import BookRouter from './books/route.js'

app.use(express.json())
app.use(cors())


app.use('/api/v1/login', LoginRouter)
app.use('/api/v1/user', RegisterRouter)
app.use('/api/v1/book', BookRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log('started')
})