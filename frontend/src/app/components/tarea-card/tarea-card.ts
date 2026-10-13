// En este archivo va el componente TareaCard, que muestra una tarea en formato tarjeta.
// Sirve para listar tareas (modo "ver", con botones Editar y Eliminar) y para crear o
// editar una tarea (modo "editar", con formulario). No se comunica con el service: recibe
// la tarea por input y avisa a la página con los outputs editar, eliminar y guardar. Se
// usa así: <app-tarea-card [tarea]="tarea" modo="ver" (editar)="..." (eliminar)="..." />.

import { Component, input, linkedSignal, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormField, form } from '@angular/forms/signals';
import { PRIORIDADES, Tarea } from '../../model/tarea';
import { GRUPOS } from '../../model/usuario';

@Component({
  imports: [FormField, DatePipe],
  selector: 'app-tarea-card',
  styleUrl: './tarea-card.css',
  templateUrl: './tarea-card.html',
})
export class TareaCard {
  public tarea = input.required<Tarea>();

  public modo = input<'ver' | 'editar'>('ver');

  public editar = output<number>();
  public eliminar = output<number>();
  public guardar = output<Tarea>();

  public readonly grupos = GRUPOS;
  public readonly prioridades = PRIORIDADES;

  public tareaModel = linkedSignal<Tarea>(() => ({ ...this.tarea() }));

  public tareaForm = form(this.tareaModel);

  public submitForm(event: Event) {
    event.preventDefault();
    this.guardar.emit(this.tareaForm().value());
  }
}
