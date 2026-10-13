// En este archivo arranca la aplicación Angular. Sirve para iniciar el componente App con
// la configuración de app.config.ts. Lo ejecuta Angular automáticamente con "npm start".

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
