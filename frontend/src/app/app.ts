// En este archivo va el componente raíz de la aplicación (app-root). Sirve para mostrar
// el layout general: encabezado, menú lateral y el router-outlet donde se cargan las
// páginas. Se usa desde main.ts al arrancar la aplicación.

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
