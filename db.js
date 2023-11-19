const { Pool } = require("pg");
const dotenv = require("dotenv");

// Configura las variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a PostgreSQL
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

module.exports = {
  query: (text, params) => pool.query(text, params),
};
