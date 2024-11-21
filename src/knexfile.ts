import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

const db = knex({
  client: 'mysql2',  // Ganti dengan 'pg' jika menggunakan PostgreSQL
  connection: {
    host: process.env.DB_HOST,       // Mengambil host dari file .env
    user: process.env.DB_USER,       // Mengambil user dari file .env
    password: process.env.DB_PASSWORD, // Mengambil password dari file .env
    database: process.env.DB_NAME,   // Mengambil nama database dari file .env
  },
});

export default db;
