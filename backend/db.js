const { Pool } = require('pg');
require('dotenv').config();

console.log('Connecting to database with config:', )
const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'password',
  database: process.env.PGDATABASE || 'todos',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
