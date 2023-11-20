const { DataTypes } = require("sequelize");
const db = require("../sequelizeConfig");
const Mensaje = require("./message");

const Trabajo = db.define("Trabajo", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // presupuesto: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  // },
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

// relaciones de usuario con trabajo
db.models.Usuario.hasMany(Trabajo, {
  as: "trabajosProfesional",
  foreignKey: "professionalId",
});
Trabajo.belongsTo(db.models.Usuario, {
  as: "profesional",
  foreignKey: "professionalId",
});
Trabajo.hasMany(Mensaje, { as: "mensajes", foreignKey: "jobId" });

module.exports = Trabajo;
