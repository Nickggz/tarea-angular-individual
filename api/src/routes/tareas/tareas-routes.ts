// En este archivo van las rutas del CRUD de tareas (GET, POST, PUT y DELETE en /tareas).
// Sirve para listar, obtener, crear, modificar y eliminar tareas, validando con los
// schemas de TypeBox. Se usa registrándolo en server.ts con el prefijo /tareas; todas las
// rutas requieren token.

import { Type } from "@fastify/type-provider-typebox";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  ActualizarTareaSchema,
  CrearTareaSchema,
  IdTareaParams,
  TareaSchema,
} from "../../schemas/tareas.ts";
import { ErrorSchema } from "../../schemas/shared.ts";
import { tareasRepo } from "../../repositories/tareas-repository.ts";

const tareasRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.authenticate);

  fastify.get("/", {
    schema: {
      summary: "Listar tareas",
      description: "Devuelve todas las tareas, de la más nueva a la más vieja.",
      tags: ["tareas"],
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(TareaSchema),
        401: ErrorSchema,
      },
    },
    handler: async function (request, reply) {
      return tareasRepo.obtenerTodas();
    },
  });

  fastify.get("/:id_tarea", {
    schema: {
      summary: "Obtener tarea",
      description: "Devuelve una tarea por su ***id_tarea***.",
      tags: ["tareas"],
      security: [{ bearerAuth: [] }],
      params: IdTareaParams,
      response: {
        200: TareaSchema,
        401: ErrorSchema,
        404: ErrorSchema,
      },
    },
    handler: async function (request, reply) {
      const { id_tarea } = request.params;
      return tareasRepo.obtenerPorId(id_tarea);
    },
  });

  fastify.post("/", {
    schema: {
      summary: "Crear tarea",
      description:
        "Crea una tarea. El creador (id_creador) es el usuario autenticado. Prioridad por defecto: 1:media.",
      tags: ["tareas"],
      security: [{ bearerAuth: [] }],
      body: CrearTareaSchema,
      response: {
        201: TareaSchema,
        400: ErrorSchema,
        401: ErrorSchema,
      },
    },
    handler: async function (request, reply) {
      const tarea = await tareasRepo.crear(request.user.id_usuario, request.body);
      reply.code(201);
      return tarea;
    },
  });

  fastify.put("/:id_tarea", {
    schema: {
      summary: "Modificar tarea",
      description:
        "Modifica una tarea por su ***id_tarea***. Solo se actualizan los campos enviados.",
      tags: ["tareas"],
      security: [{ bearerAuth: [] }],
      params: IdTareaParams,
      body: ActualizarTareaSchema,
      response: {
        200: TareaSchema,
        400: ErrorSchema,
        401: ErrorSchema,
        404: ErrorSchema,
      },
    },
    handler: async function (request, reply) {
      const { id_tarea } = request.params;
      return tareasRepo.actualizar(id_tarea, request.body);
    },
  });

  fastify.delete("/:id_tarea", {
    schema: {
      summary: "Eliminar tarea",
      description: "Elimina una tarea por su ***id_tarea***.",
      tags: ["tareas"],
      security: [{ bearerAuth: [] }],
      params: IdTareaParams,
      response: {
        204: Type.Null({ description: "No content" }),
        401: ErrorSchema,
        404: ErrorSchema,
      },
    },
    handler: async function (request, reply) {
      const { id_tarea } = request.params;
      await tareasRepo.eliminar(id_tarea);
      reply.code(204).send(null);
    },
  });
};

export default tareasRoutes;
