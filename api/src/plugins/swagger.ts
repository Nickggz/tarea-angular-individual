// En este archivo va la configuración de la documentación Swagger (@fastify/swagger y
// @fastify/swagger-ui). Sirve para generar la documentación de la API a partir de los
// schemas de las rutas. Se usa registrándolo en server.ts antes de las rutas y entrando a
// http://localhost:3000/docs.

import swagger from "@fastify/swagger";
import type { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import swaggerui from "@fastify/swagger-ui";
import fp from "fastify-plugin";

const swaggerOptions: FastifyDynamicSwaggerOptions = {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "API Usuarios y Tareas",
      description:
        "API RESTful con autenticación JWT y CRUD completo de usuarios y tareas.\n\n" +
        "1. Hacer **POST /auth/login** (ej: `admin` / `Contraseña1`).\n" +
        "2. Copiar el token, apretar **Authorize** y pegarlo.\n" +
        "3. Ya se pueden usar todas las rutas.",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.FASTIFY_PORT || 3000}`,
        description: "Development server",
      },
    ],
    tags: [
      { name: "auth", description: "Autenticación." },
      { name: "usuarios", description: "CRUD de usuarios." },
      { name: "tareas", description: "CRUD de tareas." },
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
};

export default fp(async (fastify) => {
  await fastify.register(swagger, swaggerOptions);

  await fastify.register(swaggerui, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
      persistAuthorization: true,
    },
  });
});
