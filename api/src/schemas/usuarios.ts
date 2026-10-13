// En este archivo van los schemas TypeBox de usuarios, iguales a la tabla usuarios de
// db/00.sql, y sus tipos. Sirve para validar params, body y respuestas de las rutas de
// usuarios y documentarlas en swagger. Se usa en usuarios-routes.ts y en
// usuarios-repository.ts.

import { Type } from "@fastify/type-provider-typebox";
import type { Static } from "@fastify/type-provider-typebox";
import { GrupoSchema } from "./shared.ts";

export const UsuarioSchema = Type.Object(
  {
    id_usuario: Type.Integer({ minimum: 1 }),
    username: Type.String({ minLength: 1, maxLength: 30 }),
    nombres: Type.String({ minLength: 1 }),
    apellidos: Type.String({ minLength: 1 }),
    fecha_nacimiento: Type.String({ format: "date", examples: ["1995-12-08"] }),
    nombre_completo: Type.String(),
    grupos: Type.Array(GrupoSchema, { minItems: 1, uniqueItems: true }),
    activo: Type.Boolean(),
  },
  {
    title: "Usuario",
  },
);
export type Usuario = Static<typeof UsuarioSchema>;

export const IdUsuarioParams = Type.Pick(UsuarioSchema, ["id_usuario"]);
export type IdUsuarioParamsType = Static<typeof IdUsuarioParams>;

export const CrearUsuarioSchema = Type.Object(
  {
    username: Type.String({ minLength: 1, maxLength: 30 }),
    nombres: Type.String({ minLength: 1 }),
    apellidos: Type.String({ minLength: 1 }),
    fecha_nacimiento: Type.String({ format: "date", examples: ["2000-01-31"] }),
    password: Type.String({ minLength: 6, examples: ["Contraseña1"] }),
    grupos: Type.Optional(
      Type.Array(GrupoSchema, { minItems: 1, uniqueItems: true }),
    ),
  },
  {
    title: "Crear usuario",
    additionalProperties: false,
  },
);
export type CrearUsuarioType = Static<typeof CrearUsuarioSchema>;

export const ActualizarUsuarioSchema = Type.Object(
  {
    nombres: Type.Optional(Type.String({ minLength: 1 })),
    apellidos: Type.Optional(Type.String({ minLength: 1 })),
    fecha_nacimiento: Type.Optional(Type.String({ format: "date" })),
    grupos: Type.Optional(
      Type.Array(GrupoSchema, { minItems: 1, uniqueItems: true }),
    ),
    activo: Type.Optional(Type.Boolean()),
  },
  {
    title: "Actualizar usuario (todos los campos son opcionales)",
    additionalProperties: false,
  },
);
export type ActualizarUsuarioType = Static<typeof ActualizarUsuarioSchema>;
