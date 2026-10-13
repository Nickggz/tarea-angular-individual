// En este archivo va la página de la ruta /tareas/crear. Sirve para crear una tarea
// usando TareaCard en modo "editar": le pasa una tarea vacía y, al guardar, la agrega con
// TareaService y vuelve al listado.

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TareaCard } from '../../../components/tarea-card/tarea-card';
import { Tarea } from '../../../model/tarea';
import { TareaService } from '../../../services/tarea.service';

@Component({
  imports: [TareaCard],
  selector: 'app-crear-tarea',
  styleUrl: './crear-tarea.page.css',
  templateUrl: './crear-tarea.page.html',
})
export class CrearTareaPage {
  private tareaService = inject(TareaService);
  private router = inject(Router);

  public tareaVacia: Tarea = {
    id_tarea: 0,
    id_creador: 1,
    grupo: 'user',
    titulo: '',
    descripcion: '',
    prioridad: '1:media',
    creada: '',
    terminada: null,
    estado: 'Abierta',
  };

  public async onGuardar(tarea: Tarea) {
    await this.tareaService.add(tarea);
    this.router.navigate(['/', 'tareas']);
  }
}
