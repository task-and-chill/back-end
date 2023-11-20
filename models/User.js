const { DataTypes } = require("sequelize");
const db = require("../db");

const Usuario = db.define("Usuario", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.ENUM("activo", "inactivo"),
    defaultValue: "activo",
  },
  rol: {
    type: DataTypes.ENUM("cliente", "profesional"),
    defaultValue: "cliente",
  },
});

// relaciones de usuario con trabajo

Usuario.hasMany(Trabajo, { as: "trabajos", foreignKey: "clientId" });
Trabajo.belongsTo(Usuario, { as: "cliente", foreignKey: "clientId" });
Usuario.hasMany(Mensaje, { as: "mensajesCliente", foreignKey: "clientId" });
Usuario.hasMany(Mensaje, {
  as: "mensajesProfesional",
  foreignKey: "professionalId",
});

module.exports = Usuario;
