// En este archivo van las rutas de usuarios: /usuarios, /usuarios/crear y
// /usuarios/:id_usuario. Sirve para indicar qué página se carga en cada una (lazy
// loading). Se usa desde app.routes.ts con loadChildren.

import { Routes } from '@angular/router';

export const usuariosRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Usuarios',
    loadComponent: () =>
      import('./pages/usuarios/listar-usuarios/listar-usuarios.page').then((m) => m.ListarUsuariosPage),
  },
  {
    path: 'crear',
    title: 'Crear usuario',
    loadComponent: () =>
      import('./pages/usuarios/crear-usuario/crear-usuario.page').then((m) => m.CrearUsuarioPage),
  },
  {
    path: ':id_usuario',
    title: 'Editar usuario',
    loadComponent: () =>
      import('./pages/usuarios/editar-usuario/editar-usuario.page').then((m) => m.EditarUsuarioPage),
  },
];

export default usuariosRoutes;
