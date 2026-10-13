// En este archivo van las rutas principales de la aplicación. Sirve para cargar (lazy
// loading) las rutas de usuarios y de tareas. Se usa en app.config.ts dentro de
// provideRouter.

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios.routes'),
  },
  {
    path: 'tareas',
    loadChildren: () => import('./tareas.routes'),
  },
];
