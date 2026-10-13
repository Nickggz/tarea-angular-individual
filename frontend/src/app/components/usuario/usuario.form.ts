// En este archivo va el componente UsuarioForm, el formulario de usuario. Sirve para
// crear o editar un usuario: recibe el usuario por input y, al guardar, lo devuelve con
// el output guardarUsuario. Se usa así: <app-usuario-form [usuario]="usuario"
// (guardarUsuario)="onGuardarUsuario($event)" />.

import { Component, input, linkedSignal, output } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { GRUPOS, Grupo, Usuario } from '../../model/usuario';

@Component({
  imports: [FormField],
  selector: 'app-usuario-form',
  styleUrl: './usuario.form.css',
  templateUrl: './usuario.form.html',
})
export class UsuarioForm {
  public usuario = input.required<Usuario>();

  public usuarioModel = linkedSignal<Usuario>(() => ({
    ...this.usuario(),
    grupos: [...this.usuario().grupos],
  }));

  public usuarioForm = form(this.usuarioModel);

  public readonly grupos = GRUPOS;

  public guardarUsuario = output<Usuario>();

  public onGrupoToggle(valor: Grupo, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const gruposActuales = this.usuarioModel().grupos;

    const nuevosGrupos = isChecked
      ? [...gruposActuales, valor]
      : gruposActuales.filter((g) => g !== valor);

    this.usuarioForm.grupos().value.set(nuevosGrupos);
  }

  public submitForm(event: Event) {
    event.preventDefault();
    this.guardarUsuario.emit(this.usuarioForm().value());
  }
}
