# Usuarios y Tareas — API (Fastify) + Frontend (Angular)

Repositorio con dos proyectos independientes:

| Carpeta     | Qué es                                                                 |
|-------------|------------------------------------------------------------------------|
| `api/`      | API RESTful con Fastify + TypeBox + JWT + Swagger, sobre PostgreSQL.   |
| `frontend/` | App Angular que usa servicios con arrays en memoria (no consume la API). |

Requisito: **Node.js 24** (o 22.18+, que ejecuta `.ts` directamente). Docker para la base de datos.

---

## API (`api/`)

```bash
cd api
cp .env.example .env          # credenciales de la base, puerto y secreto JWT
docker compose up -d          # levanta Postgres y ejecuta db/00.sql la primera vez
npm install
npm run dev                   # http://localhost:3000  ->  documentación en /docs
```

> Si cambiás `db/00.sql` y querés volver a cargarlo: `docker compose down` y `docker compose up -d`
> (el compose no tiene volumen de datos, así que arranca la base de cero).

### Rutas

| Método | Ruta                            | Descripción                                   |
|--------|---------------------------------|-----------------------------------------------|
| POST   | `/auth/login`                   | `{ username, password }` → `{ token }`        |
| GET    | `/auth/profile`                 | Datos del usuario autenticado                 |
| GET    | `/usuarios`                     | Listar usuarios                               |
| GET    | `/usuarios/:id_usuario`         | Obtener usuario                               |
| POST   | `/usuarios`                     | Crear usuario (con password)                  |
| PUT    | `/usuarios/:id_usuario`         | Modificar usuario (campos parciales)          |
| DELETE | `/usuarios/:id_usuario`         | Eliminar usuario                              |
| GET    | `/tareas`                       | Listar tareas                                 |
| GET    | `/tareas/:id_tarea`             | Obtener tarea                                 |
| POST   | `/tareas`                       | Crear tarea (creador = usuario del token)     |
| PUT    | `/tareas/:id_tarea`             | Modificar tarea (campos parciales)            |
| DELETE | `/tareas/:id_tarea`             | Eliminar tarea                                |

Todas las rutas salvo `/auth/login` requieren `Authorization: Bearer <token>`.
Usuarios de prueba (de `db/00.sql`): `superadmin`, `admin`, `user`, `mgonzalez`, `srodriguez`, `lfernandez` — contraseña `Contraseña1`.

En Swagger (`/docs`): ejecutar `POST /auth/login`, copiar el token, botón **Authorize**, pegarlo.

### Estructura

```
api/
├── server.ts                    # instancia fastify, error handler, registro de plugins y rutas
├── docker-compose.yaml          # el provisto en la tarea
├── db/00.sql                    # esquema + datos (provisto)
└── src/
    ├── db/database.ts           # Pool de pg (lee PG* del .env)
    ├── errors/response.errors.ts
    ├── schemas/                 # TypeBox: usuarios, tareas, auth, shared
    ├── repositories/            # usuarios-repository.ts, tareas-repository.ts
    ├── plugins/                 # swagger.ts, jwt.ts (decorador authenticate)
    └── routes/                  # auth/, usuarios/, tareas/
```

---

## Frontend (`frontend/`)

```bash
cd frontend
npm install
npm start                     # http://localhost:4200
```

| Ruta                     | Qué hace                                                        |
|--------------------------|-----------------------------------------------------------------|
| `/usuarios`              | Tabla de usuarios con botones Editar y Borrar                   |
| `/usuarios/crear`        | Crear usuario con el componente `UsuarioForm`                   |
| `/usuarios/:id_usuario`  | Editar usuario con el componente `UsuarioForm`                  |
| `/tareas`                | Tarjetas (`TareaCard`) con botones Editar y Eliminar            |
| `/tareas/crear`          | Crear tarea con `TareaCard` en modo edición                     |
| `/tareas/:id_tarea`      | Editar tarea con `TareaCard` en modo edición                    |

- `UsuarioService` y `TareaService` tienen un array con los **mismos datos que la API** (`db/00.sql`) y funcionan como base de datos en memoria.
- Solo las páginas llaman a los servicios. `TareaCard` recibe la tarea por `input()` y avisa con `output()` (`editar`, `eliminar`, `guardar`).
- `npm test` corre los tests unitarios.
