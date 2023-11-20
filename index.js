const express = require("express");
const cors = require("cors");
const db = require("./sequelizeConfig");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/test", (req, res) => {
  res.json({ message: "¡Servidor en funcionamiento correctamente!" });
});

app
  .listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.BACK_PORT}`);
  })
  .on("error", (err) => {
    console.error("Error al iniciar el servidor:", err.message);
  });

db.query("SELECT NOW()", [])
  .then((res) => {
    console.log("Hora actual en la base de datos:", res[0][0].now);
  })
  .catch((err) => {
    console.error("Error en la consulta a la base de datos:", err);
  });

// Back\testrela.js
// require("./testrela");
