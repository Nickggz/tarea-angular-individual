// En este archivo va la página de la ruta /usuarios/:id_usuario. Sirve para editar un
// usuario usando UsuarioForm: recibe id_usuario de la ruta, carga el usuario con
// UsuarioService y, al guardar, lo actualiza y vuelve al listado.

import { Component, computed, inject, input, resource } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioForm } from '../../../components/usuario/usuario.form';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  imports: [UsuarioForm],
  selector: 'app-editar-usuario',
  styleUrl: './editar-usuario.page.css',
  templateUrl: './editar-usuario.page.html',
})
export class EditarUsuarioPage {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  public id_usuario = input.required<number, string>({
    transform: (value) => Number(value),
  });

  public usuarioResource = resource({
    params: () => {
      const id_usuario = this.id_usuario();
      if (!id_usuario) return undefined;
      return { id_usuario };
    },
    loader: async ({ params }) => {
      return this.usuarioService.getById(params.id_usuario);
    },
  });

  public usuario = computed(() => this.usuarioResource.value());

  public async onGuardarUsuario(usuario: Usuario) {
    await this.usuarioService.update(this.id_usuario(), usuario);
    this.router.navigate(['/', 'usuarios']);
  }
}
