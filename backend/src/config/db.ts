import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
});
// console.log(process.env.POSTGRES_USER);
// console.log(process.env.POSTGRES_DB);
// console.log(pool)


export const query = (text: string, params: any[]) => pool.query(text, params);

export default pool;