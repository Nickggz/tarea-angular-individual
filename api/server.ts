// En este archivo se crea y arranca el servidor Fastify. Sirve para configurar el logger,
// el manejo de errores y registrar los plugins (swagger, jwt) y las rutas (auth,
// usuarios, tareas). Se usa con "npm run dev", que lo ejecuta leyendo las variables del
// .env.

import Fastify from "fastify";
import type { FastifyListenOptions } from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import swagger from "./src/plugins/swagger.ts";
import jwtPlugin from "./src/plugins/jwt.ts";
import authRoutes from "./src/routes/auth/auth-routes.ts";
import usuariosRoutes from "./src/routes/usuarios/usuarios-routes.ts";
import tareasRoutes from "./src/routes/tareas/tareas-routes.ts";
import { transformarErrorPostgres } from "./src/errors/response.errors.ts";
import type { PostgresError } from "./src/errors/response.errors.ts";

const loggerOptions = {
  level: process.env.FASTIFY_LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname",
    },
  },
};

const fastify = Fastify({
  logger: loggerOptions,
  routerOptions: {
    ignoreTrailingSlash: true,
  },
}).withTypeProvider<TypeBoxTypeProvider>();

function esErrorPostgres(error: unknown): error is PostgresError {
  const e = error as PostgresError;
  return (
    typeof e?.code === "string" &&
    /^[0-9A-Z]{5}$/.test(e.code) &&
    "severity" in (e as object)
  );
}

fastify.setErrorHandler(function (error, request, reply) {
  const errorFinal = esErrorPostgres(error)
    ? transformarErrorPostgres(error)
    : error;
  const statusCode = (errorFinal as { statusCode?: number }).statusCode ?? 500;
  if (statusCode >= 500) request.log.error(error);
  reply.status(statusCode).send(errorFinal);
});

await fastify.register(swagger);
await fastify.register(jwtPlugin);

await fastify.register(authRoutes, { prefix: "/auth" });
await fastify.register(usuariosRoutes, { prefix: "/usuarios" });
await fastify.register(tareasRoutes, { prefix: "/tareas" });

try {
  const fastifyListenOptions: FastifyListenOptions = {
    host: "::",
    port: parseInt(process.env.FASTIFY_PORT || "3000"),
  };
  await fastify.listen(fastifyListenOptions);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
