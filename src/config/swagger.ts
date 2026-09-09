import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API - tickets y usuarios",
    description: "Documentacion del sistema de tickets",
    version: "1.0.0",
  },
  host: "localhost:3000",
  schemes: ["http"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  definitions: {
    Rol: {
      "@enum": ["PROFESOR", "TECNICO", "DIRECTOR"],
      example: "PROFESOR",
    },
    EstadoTicket: {
      "@enum": ["ABIERTO", "EN_PROCESO", "RESULTO"],
    },
    loginDTO: {
      email: "kevinfunval@gmail.com",
      password: "123456789",
    },
    registerDTO: {
      nombre: "juan perez",
      email: "juanfunval@gmail.com",
      password: "123456789",
      rol: "PROFESOR",
    },
    ticketDTO: {
      titulo: "error de prendido",
      descripcion: "la pc numero 3 esta fallando al prender",
      aula: "101-A",
    },
    tickertUpdateDTO: {
      estado: "EN_PROCESO",
    },
  },
};

const outputFile = "./src/config/swagger-output.json";

const routes = ["./src/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
