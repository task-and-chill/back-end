const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.BACK_PORT}`);
});

db.query("SELECT NOW()", [])
  .then((res) =>
    console.log("Hora actual en la base de datos:", res.rows[0].now)
  )
  .catch((err) => console.error(err));
