import pool from 'pg'

const {Pool} = pool

const con = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bookstore',
    password: 'abijah333',
    port: '5432'
})


export {con}

