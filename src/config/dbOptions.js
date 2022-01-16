require('dotenv').config({ path: ".env" });

// let options = {
//     host: process.env.DB_LOCAL_HOST,
//     port: process.env.DB_LOCAL_PORT,
//     user: process.env.DB_LOCAL_USER,
//     password: process.env.DB_LOCAL_PASSWORD,
//     database: process.env.DB_LOCAL_DATABASE,
//     dateStrings: true
// }

let options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dateStrings: true
}

module.exports = options;