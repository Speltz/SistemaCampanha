const mysql = require('mysql');
require ('dotenv').config();

var config =
{
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
};

const conn =new mysql.createConnection(config);

conn.connect(
    function (err) {
        if (err) {
            console.log("!!! Cannot connect !!! Error:")
            throw err;
        }
        else {
            console.log ("Connection estabilishsed.")
        }
    }
)
module.exports = conn;