import pool from 'pg'
import dotenv from "dotenv";
dotenv.config();


const {Pool} = pool

const con = new Pool({
   connectionString:process.env.DATABASEURL,
   ssl:{
    rejectUnauthorized:false
   }
})


export {con}

