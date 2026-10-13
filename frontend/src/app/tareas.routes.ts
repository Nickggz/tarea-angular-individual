// En este archivo van las rutas de tareas: /tareas, /tareas/crear y /tareas/:id_tarea.
// Sirve para indicar qué página se carga en cada una (lazy loading). Se usa desde
// app.routes.ts con loadChildren.

import { Routes } from '@angular/router';

export const tareasRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Tareas',
    loadComponent: () =>
      import('./pages/tareas/listar-tareas/listar-tareas.page').then((m) => m.ListarTareasPage),
  },
  {
    path: 'crear',
    title: 'Crear tarea',
    loadComponent: () =>
      import('./pages/tareas/crear-tarea/crear-tarea.page').then((m) => m.CrearTareaPage),
  },
  {
    path: ':id_tarea',
    title: 'Editar tarea',
    loadComponent: () =>
      import('./pages/tareas/editar-tarea/editar-tarea.page').then((m) => m.EditarTareaPage),
  },
];

export default tareasRoutes;
