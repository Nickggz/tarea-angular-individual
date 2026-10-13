// En este archivo va la página de la ruta /tareas. Sirve para mostrar todas las tareas en
// tarjetas TareaCard. Es la única que usa TareaService: cuando una tarjeta emite editar
// navega a /tareas/:id_tarea, y cuando emite eliminar borra la tarea y recarga la lista.

import { Component, computed, inject, resource } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TareaCard } from '../../../components/tarea-card/tarea-card';
import { Tarea } from '../../../model/tarea';
import { TareaService } from '../../../services/tarea.service';

@Component({
  imports: [TareaCard, RouterLink],
  selector: 'app-listar-tareas',
  styleUrl: './listar-tareas.page.css',
  templateUrl: './listar-tareas.page.html',
})
export class ListarTareasPage {
  private router = inject(Router);
  private tareaService = inject(TareaService);

  public tareasResource = resource({
    defaultValue: [],
    params: () => ({}),
    loader: () => this.tareaService.getAll(),
  });

  public tareas = computed<Tarea[]>(() => this.tareasResource.value());

  public onEditar(id_tarea: number) {
    this.router.navigate(['/', 'tareas', id_tarea]);
  }

  public async onEliminar(id_tarea: number) {
    await this.tareaService.delete(id_tarea);
    this.tareasResource.reload();
  }
}
