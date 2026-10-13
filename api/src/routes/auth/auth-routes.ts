// En este archivo van las rutas de autenticación: POST /auth/login y GET /auth/profile.
// Sirve para obtener un token con usuario y contraseña y para consultar los datos del
// usuario autenticado. Se usa registrándolo en server.ts con el prefijo /auth.

import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { SignOptions } from "@fastify/jwt";
import { LoginSchema, TokenSchema } from "../../schemas/auth.ts";
import type { JwtPayload } from "../../schemas/auth.ts";
import { UsuarioSchema } from "../../schemas/usuarios.ts";
import { ErrorSchema } from "../../schemas/shared.ts";
import { usuariosRepo } from "../../repositories/usuarios-repository.ts";

const authRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post("/login", {
    schema: {
      summary: "Login",
      description:
        "Mediante username y contraseña se obtiene un token JWT para consumir la api.",
      tags: ["auth"],
      body: LoginSchema,
      response: {
        200: TokenSchema,
        400: ErrorSchema,
        401: ErrorSchema,
      },
    },
    handler: async function (request, reply) {
      const { username, password } = request.body;

      const usuario = await usuariosRepo.verificarCredenciales(
        username,
        password,
      );

      const payload: JwtPayload = {
        id_usuario: usuario.id_usuario,
        username: usuario.username,
        grupos: usuario.grupos,
      };

      const signOptions: Partial<SignOptions> = {
        expiresIn: "8h",
      };
      const token = fastify.jwt.sign(payload, signOptions);
      return { token };
    },
  });

  fastify.get("/profile", {
    schema: {
      summary: "Obtener perfil del usuario autenticado",
      description:
        "Devuelve los datos (actualizados desde la base) del usuario dueño del token.",
      tags: ["auth"],
      security: [{ bearerAuth: [] }],
      response: {
        200: UsuarioSchema,
        401: ErrorSchema,
        404: ErrorSchema,
      },
    },
    onRequest: [fastify.authenticate],
    handler: async function (request, reply) {
      return usuariosRepo.obtenerPorId(request.user.id_usuario);
    },
  });
};

export default authRoutes;
