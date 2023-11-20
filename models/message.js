const { DataTypes } = require("sequelize");
const db = require("../sequelizeConfig");
const Usuario = require("./User");
const Trabajo = require("./Job");

const Mensaje = db.define("Mensaje", {
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  state: {
    type: DataTypes.ENUM("activo", "inactivo"),
    defaultValue: "activo",
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  professionalId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// relaciones de mensaje con usuario (cliente) y trabajo (profesional)
Usuario.hasMany(Mensaje, { as: "mensajes", foreignKey: "clientId" });
Mensaje.belongsTo(Usuario, { as: "cliente", foreignKey: "clientId" });
Trabajo.hasMany(Mensaje, { as: "mensajes", foreignKey: "professionalId" });
Mensaje.belongsTo(Trabajo, { as: "trabajo", foreignKey: "professionalId" });
Mensaje.belongsTo(Usuario, {
  as: "cliente",
  foreignKey: "clientId",
});
Mensaje.belongsTo(Usuario, {
  as: "profesional",
  foreignKey: "professionalId",
});
Mensaje.belongsTo(Trabajo, {
  as: "trabajo",
  foreignKey: "jobId",
});
Usuario.hasMany(Trabajo, {
  as: "trabajosCliente",
  foreignKey: "clientId",
});

module.exports = Mensaje;
