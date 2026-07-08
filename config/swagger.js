import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "URL Shortener API",
      version: "1.0.0",
      description:
        "A simple URL shortener API with JWT authentication, MongoDB, and Redis caching",
      name: "Prince Aggarwal",
    url: "https://github.com/princeaggarwal2005" ,
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development",
      },
      {
        url: "https://trimurl-x10s.onrender.com",
        description: "Production",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to route files with JSDoc comments
};

export default swaggerJsdoc(options);