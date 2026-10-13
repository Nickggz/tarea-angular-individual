// En este archivo va el plugin de autenticación con JWT (@fastify/jwt) y el decorador
// authenticate. Sirve para firmar tokens en el login y verificar el token en las rutas
// protegidas. Se usa registrándolo en server.ts y poniendo fastify.authenticate como hook
// onRequest en las rutas que requieren token.

import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import type { FastifyJWTOptions } from "@fastify/jwt";
import type { FastifyReply, FastifyRequest } from "fastify";
import { UnAuthenticatedError } from "../errors/response.errors.ts";
import type { JwtPayload } from "../schemas/auth.ts";

const jwtOptions: FastifyJWTOptions = {
  secret: process.env.FASTIFY_SECRET || "",
};

export default fp(async (fastify) => {
  if (!jwtOptions.secret) throw new Error("Falta setear FASTIFY_SECRET en el .env");

  await fastify.register(jwt, jwtOptions);

  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        throw new UnAuthenticatedError("Token inválido o ausente.");
      }
    },
  );
});

declare module "fastify" {
  interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: JwtPayload;
    user: JwtPayload;
  }
}
