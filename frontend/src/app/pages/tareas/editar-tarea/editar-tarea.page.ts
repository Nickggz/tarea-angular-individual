// En este archivo va la página de la ruta /tareas/:id_tarea. Sirve para editar una tarea
// usando TareaCard en modo "editar": recibe id_tarea de la ruta, carga la tarea con
// TareaService y, al guardar, la actualiza y vuelve al listado.

import { Component, computed, inject, input, resource } from '@angular/core';
import { Router } from '@angular/router';
import { TareaCard } from '../../../components/tarea-card/tarea-card';
import { Tarea } from '../../../model/tarea';
import { TareaService } from '../../../services/tarea.service';

@Component({
  imports: [TareaCard],
  selector: 'app-editar-tarea',
  styleUrl: './editar-tarea.page.css',
  templateUrl: './editar-tarea.page.html',
})
export class EditarTareaPage {
  private tareaService = inject(TareaService);
  private router = inject(Router);

  public id_tarea = input.required<number, string>({
    transform: (value) => Number(value),
  });

  public tareaResource = resource({
    params: () => {
      const id_tarea = this.id_tarea();
      if (!id_tarea) return undefined;
      return { id_tarea };
    },
    loader: async ({ params }) => {
      return this.tareaService.getById(params.id_tarea);
    },
  });

  public tarea = computed(() => this.tareaResource.value());

  public async onGuardar(tarea: Tarea) {
    await this.tareaService.update(this.id_tarea(), tarea);
    this.router.navigate(['/', 'tareas']);
  }
}
