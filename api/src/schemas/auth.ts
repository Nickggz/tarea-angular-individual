// En este archivo van los schemas TypeBox de autenticación: credenciales de login,
// respuesta con el token y datos que se guardan dentro del token. Sirve para validar el
// body del login y documentarlo en swagger. Se usa en auth-routes.ts y en el plugin
// jwt.ts.

import { Type } from "@fastify/type-provider-typebox";
import type { Static } from "@fastify/type-provider-typebox";
import { GrupoSchema } from "./shared.ts";

export const LoginSchema = Type.Object(
  {
    username: Type.String({ minLength: 1, examples: ["admin"] }),
    password: Type.String({ minLength: 1, examples: ["Contraseña1"] }),
  },
  { title: "Credenciales de login" },
);
export type LoginType = Static<typeof LoginSchema>;

export const TokenSchema = Type.Object(
  { token: Type.String() },
  { title: "Token JWT" },
);

export const JwtPayloadSchema = Type.Object({
  id_usuario: Type.Integer(),
  username: Type.String(),
  grupos: Type.Array(GrupoSchema),
});
export type JwtPayload = Static<typeof JwtPayloadSchema>;
