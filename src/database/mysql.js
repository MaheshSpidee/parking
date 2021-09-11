'use strict';
if (process.env.IS_DEBUGGING) console.log(__filename);

const mysql = require('mysql');
const util = require('util');

class MySqlSingelton {

    constructor() {
        this.mySqlPool = mysql.createPool({
            connectionLimit: parseInt(process.env.MYSQL_POOL_CONNECTION_LIMIT),
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DBNAME,
        });
    }

    static getInstance() {
        if (!this.mySqlPool) {
            this.mySqlPool = new MySqlSingelton().mySqlPool;
        }

        this.mySqlPool.getConnection(function (err, connection) {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.')
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.')
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.')
                }
            }
            if (connection) {
                connection.release();
                console.log("Connected");
            }
        });

        // Refactoring MySQL to Node.js 8’s Async/Await
        this.mySqlPool.query = util.promisify(this.mySqlPool.query);
        return this.mySqlPool;
    }
}

module.exports = MySqlSingelton;