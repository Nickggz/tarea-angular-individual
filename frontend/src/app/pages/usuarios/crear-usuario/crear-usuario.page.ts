// En este archivo va la página de la ruta /usuarios/crear. Sirve para crear un usuario
// usando UsuarioForm: le pasa un usuario vacío y, al guardar, lo agrega con
// UsuarioService y vuelve al listado.

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioForm } from '../../../components/usuario/usuario.form';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  imports: [UsuarioForm],
  selector: 'app-crear-usuario',
  styleUrl: './crear-usuario.page.css',
  templateUrl: './crear-usuario.page.html',
})
export class CrearUsuarioPage {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  public usuarioVacio: Usuario = {
    id_usuario: 0,
    username: '',
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    nombre_completo: '',
    grupos: ['user'],
    activo: true,
  };

  public async onGuardarUsuario(usuario: Usuario) {
    await this.usuarioService.add(usuario);
    this.router.navigate(['/', 'usuarios']);
  }
}
