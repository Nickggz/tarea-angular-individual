// En este archivo van los schemas TypeBox compartidos: el formato de los errores y los
// grupos válidos (user, admin, superadmin). Sirve para no repetirlos en cada schema. Se
// usa importándolos desde los otros schemas y en las respuestas de error de las rutas.

import { Type } from "@fastify/type-provider-typebox";

export const ErrorSchema = Type.Object(
  {
    statusCode: Type.Integer(),
    error: Type.String(),
    message: Type.String(),
    code: Type.Optional(Type.String()),
  },
  {
    title: "Esquema para errores",
  },
);

export const GRUPOS = ["user", "admin", "superadmin"] as const;

export const GrupoSchema = Type.Union(
  GRUPOS.map((g) => Type.Literal(g)),
  { description: "Grupo: user | admin | superadmin" },
);
