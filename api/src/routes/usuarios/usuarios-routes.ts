// En este archivo van las rutas del CRUD de usuarios (GET, POST, PUT y DELETE en
// /usuarios). Sirve para listar, obtener, crear, modificar y eliminar usuarios, validando
// con los schemas de TypeBox. Se usa registrándolo en server.ts con el prefijo /usuarios;
// todas las rutas requieren token.

import { Type } from "@fastify/type-provider-typebox";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  ActualizarUsuarioSchema,
  CrearUsuarioSchema,
  IdUsuarioParams,
  UsuarioSchema,
} from "../../schemas/usuarios.ts";
import { ErrorSchema } from "../../schemas/shared.ts";
import { usuariosRepo } from "../../repositories/usuarios-repository.ts";
import { NotFoundError } from "../../errors/response.errors.ts";

const usuariosRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.authenticate);

  fastify.get("/", {
    schema: {
      summary: "Listar usuarios",
      description: "Devuelve todos los usuarios ordenados por id.",
      tags: ["usuarios"],
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(UsuarioSchema),
        401: ErrorSchema,
      },
    },
    handler: async function (request, reply) {
      return usuariosRepo.obtenerTodos();
    },
  });

  fastify.get("/:id_usuario", {
    schema: {
      summary: "Obtener usuario",
      description: "Devuelve un usuario por su ***id_usuario***.",
      tags: ["usuarios"],
      security: [{ bearerAuth: [] }],
      params: IdUsuarioParams,
      response: {
        200: UsuarioSchema,
        401: ErrorSchema,
        404: ErrorSchema,
      },
    },
    handler: async function (request, reply) {
      const { id_usuario } = request.params;
      return usuariosRepo.obtenerPorId(id_usuario);
    },
  });

  fastify.post("/", {
    schema: {
      summary: "Crear usuario",
      description:
        "Crea un usuario con su contraseña. Si no se indican grupos se le asigna ['user'].",
      tags: ["usuarios"],
      security: [{ bearerAuth: [] }],
      body: CrearUsuarioSchema,
      response: {
        201: UsuarioSchema,
        400: ErrorSchema,
        401: ErrorSchema,
        409: ErrorSchema,
      },
    },
    handler: async function (request, reply) {
      const usuario = await usuariosRepo.crear(request.body);
      reply.code(201);
      return usuario;
    },
  });

  fastify.put("/:id_usuario", {
    schema: {
      summary: "Modificar usuario",
      description:
        "Modifica un usuario por su ***id_usuario***. Solo se actualizan los campos enviados.",
      tags: ["usuarios"],
      security: [{ bearerAuth: [] }],
      params: IdUsuarioParams,
      body: ActualizarUsuarioSchema,
      response: {
        200: UsuarioSchema,
        400: ErrorSchema,
        401: ErrorSchema,
        404: ErrorSchema,
        409: ErrorSchema,
      },
    },
    handler: async function (request, reply) {
      const { id_usuario } = request.params;
      return usuariosRepo.actualizar(id_usuario, request.body);
    },
  });

  fastify.delete("/:id_usuario", {
    schema: {
      summary: "Eliminar usuario",
      description:
        "Elimina un usuario por su ***id_usuario*** (también sus credenciales y tareas creadas).",
      tags: ["usuarios"],
      security: [{ bearerAuth: [] }],
      params: IdUsuarioParams,
      response: {
        204: Type.Null({ description: "No content" }),
        401: ErrorSchema,
        404: ErrorSchema,
      },
    },
    handler: async function (request, reply) {
      const { id_usuario } = request.params;
      const borrado = await usuariosRepo.eliminar(id_usuario);
      if (!borrado) throw new NotFoundError("Usuario no encontrado.");
      reply.code(204).send(null);
    },
  });
};

export default usuariosRoutes;
