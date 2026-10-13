// En este archivo va la conexión a PostgreSQL (Pool de pg). Sirve para que los
// repositorios ejecuten consultas a la base. Se usa importando myPool y llamando a
// myPool.query(sql, parametros); los datos de conexión salen de las variables PG* del
// .env.

import { Pool, types } from "pg";

import type { PoolConfig } from "pg";

types.setTypeParser(1082, (valor: string) => valor);

const pgConfig: PoolConfig = {
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 10000,
  max: 10,
  min: 0,
  allowExitOnIdle: false,
  maxLifetimeSeconds: 0,
};

export const myPool = new Pool(pgConfig);
