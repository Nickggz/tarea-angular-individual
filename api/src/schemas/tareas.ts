// En este archivo van los schemas TypeBox de tareas, iguales a la tabla tareas de
// db/00.sql, y sus tipos. Sirve para validar params, body y respuestas de las rutas de
// tareas y documentarlas en swagger. Se usa en tareas-routes.ts y en
// tareas-repository.ts.

import { Type } from "@fastify/type-provider-typebox";
import type { Static } from "@fastify/type-provider-typebox";
import { GrupoSchema } from "./shared.ts";

export const PrioridadSchema = Type.Union(
  [Type.Literal("0:baja"), Type.Literal("1:media"), Type.Literal("2:alta")],
  { description: "Prioridad: 0:baja | 1:media | 2:alta" },
);

export const TareaSchema = Type.Object(
  {
    id_tarea: Type.Integer({ minimum: 1 }),
    id_creador: Type.Integer(),
    grupo: GrupoSchema,
    titulo: Type.String({ minLength: 1, maxLength: 100 }),
    descripcion: Type.Union([Type.String(), Type.Null()]),
    prioridad: PrioridadSchema,
    creada: Type.String({ format: "date-time" }),
    terminada: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    estado: Type.Union([Type.Literal("Abierta"), Type.Literal("Cerrada")]),
  },
  {
    title: "Tarea",
  },
);
export type Tarea = Static<typeof TareaSchema>;

export const IdTareaParams = Type.Pick(TareaSchema, ["id_tarea"]);
export type IdTareaParamsType = Static<typeof IdTareaParams>;

export const CrearTareaSchema = Type.Object(
  {
    grupo: GrupoSchema,
    titulo: Type.String({ minLength: 1, maxLength: 100 }),
    descripcion: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    prioridad: Type.Optional(PrioridadSchema),
  },
  {
    title: "Crear tarea (el creador es el usuario autenticado)",
    additionalProperties: false,
  },
);
export type CrearTareaType = Static<typeof CrearTareaSchema>;

export const ActualizarTareaSchema = Type.Object(
  {
    grupo: Type.Optional(GrupoSchema),
    titulo: Type.Optional(Type.String({ minLength: 1, maxLength: 100 })),
    descripcion: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    prioridad: Type.Optional(PrioridadSchema),
  },
  {
    title: "Actualizar tarea (todos los campos son opcionales)",
    additionalProperties: false,
  },
);
export type ActualizarTareaType = Static<typeof ActualizarTareaSchema>;
