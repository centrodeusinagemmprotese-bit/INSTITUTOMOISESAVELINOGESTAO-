// backend/db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "proteselab",
  password: process.env.DB_PASS || "postgres",
  port: process.env.DB_PORT || 5432,
});

pool.on("connect", () => {
  console.log("✅ Conectado ao banco de dados PostgreSQL");
});

export default pool;
