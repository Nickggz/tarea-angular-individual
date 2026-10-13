// En este archivo va la página de la ruta /usuarios. Sirve para mostrar todos los
// usuarios en una tabla; cada fila tiene un botón Editar, que navega a
// /usuarios/:id_usuario, y un botón Borrar, que elimina el usuario con UsuarioService y
// recarga la tabla.

import { Component, computed, inject, resource } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-listar-usuarios',
  styleUrl: './listar-usuarios.page.css',
  templateUrl: './listar-usuarios.page.html',
})
export class ListarUsuariosPage {
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);

  public usuariosResource = resource({
    defaultValue: [],
    params: () => ({}),
    loader: () => this.usuarioService.getAll(),
  });

  public usuarios = computed<Usuario[]>(() => this.usuariosResource.value());

  public goToEditar(id_usuario: number) {
    this.router.navigate(['/', 'usuarios', id_usuario]);
  }

  public async borrar(id_usuario: number) {
    await this.usuarioService.delete(id_usuario);
    this.usuariosResource.reload();
  }
}
