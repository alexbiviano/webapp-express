const express = require ('express')
const mysql = require('mysql2')
const app = express()
const port = 3000

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'db_movie'
})
