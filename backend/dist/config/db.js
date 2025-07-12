"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
});
// console.log(process.env.POSTGRES_USER);
// console.log(process.env.POSTGRES_DB);
// console.log(pool)
const query = (text, params) => pool.query(text, params);
exports.query = query;
exports.default = pool;
