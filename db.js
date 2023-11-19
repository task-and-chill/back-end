const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Manejar errores en la conexión
pool.on("error", (err, client) => {
  console.error("Error in PostgreSQL pool", err);
});

// Registrar un mensaje cuando se establece una nueva conexión
pool.on("connect", () => {
  console.log("Connected to the database");
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
