const db = require("./sequelizeConfig");
const Usuario = require("./models/User");
const Trabajo = require("./models/Job");
const Mensaje = require("./models/message");

// Sincronizar modelos con la base de datos
db.sync({ force: true }) // Esto eliminará y recreará todas las tablas, solo para propósitos de prueba
  .then(() => {
    // Crear un usuario
    return Usuario.create({
      name: "Juan",
      lastname: "Pérez",
      email: "juan@example.com",
      phone: 123456789,
      password: "contraseña123",
    });
  })
  .then((usuario) => {
    // Crear un trabajo asociado al usuario
    return Trabajo.create({
      name: "Desarrollo web",
      description: "Desarrollar un sitio web",
      category: "Tecnología",
      date: new Date(),
      state: "activo",
      clientId: usuario.id, // Asociar al usuario recién creado
    });
  })
  .then((trabajo) => {
    // Crear un mensaje asociado al trabajo y usuario
    return Mensaje.create({
      message: "Hola, estoy interesado en tu trabajo",
      date: new Date(),
      state: "activo",
      clientId: 1, // ID del usuario que envía el mensaje
      professionalId: 1, // ID del usuario asociado al trabajo
      jobId: trabajo.id, // Asociar al trabajo recién creado
    });
  })
  .then(() => {
    // Consultar el usuario con sus trabajos y mensajes
    return Usuario.findOne({
      where: { id: 1 }, // ID del usuario creado
      include: [
        { model: Trabajo, as: "trabajos" },
        { model: Mensaje, as: "mensajesCliente" },
        { model: Mensaje, as: "mensajesProfesional" },
      ],
    });
  })
  .then((usuarioConRelaciones) => {
    console.log(JSON.stringify(usuarioConRelaciones, null, 2));
  })
  .catch((error) => {
    console.error("Error en la prueba:", error);
  })
  .finally(() => {
    // Cerrar la conexión con la base de datos
    db.close();
  });
