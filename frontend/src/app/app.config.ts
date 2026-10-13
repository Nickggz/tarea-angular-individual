// En este archivo va la configuración de la aplicación Angular. Sirve para registrar el
// router con las rutas y withComponentInputBinding, que hace que los parámetros de la
// ruta lleguen a las páginas como input(). Se usa en main.ts al arrancar la aplicación.

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
  ],
};
