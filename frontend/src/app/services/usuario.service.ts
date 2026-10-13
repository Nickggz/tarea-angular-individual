// En este archivo va UsuarioService, con un array de usuarios con los mismos datos que la
// API (db/00.sql). Sirve como base de datos en memoria para las páginas de usuarios. Se
// usa con inject(UsuarioService) y sus métodos getAll(), getById(), add(), update() y
// delete().

import { Service } from '@angular/core';
import { Usuario } from '../model/usuario';

const USUARIOS_INICIALES: Usuario[] = [
  { id_usuario: 1, username: 'superadmin', nombres: 'EL', apellidos: 'SUPERADMIN', fecha_nacimiento: '1995-12-08', nombre_completo: 'EL SUPERADMIN', grupos: ['superadmin'], activo: true },
  { id_usuario: 2, username: 'admin', nombres: 'Administrador', apellidos: 'Sistema', fecha_nacimiento: '1985-03-15', nombre_completo: 'Administrador Sistema', grupos: ['admin', 'user'], activo: true },
  { id_usuario: 3, username: 'user', nombres: 'Un', apellidos: 'User', fecha_nacimiento: '1993-07-22', nombre_completo: 'Un User', grupos: ['user'], activo: true },
  { id_usuario: 4, username: 'mgonzalez', nombres: 'Martín', apellidos: 'González', fecha_nacimiento: '1992-07-22', nombre_completo: 'Martín González', grupos: ['user'], activo: true },
  { id_usuario: 5, username: 'srodriguez', nombres: 'Sofía', apellidos: 'Rodríguez', fecha_nacimiento: '1995-11-08', nombre_completo: 'Sofía Rodríguez', grupos: ['user'], activo: true },
  { id_usuario: 6, username: 'lfernandez', nombres: 'Lucas', apellidos: 'Fernández', fecha_nacimiento: '2010-01-30', nombre_completo: 'Lucas Fernández', grupos: ['user'], activo: true },
];

@Service()
export class UsuarioService {
  private usuarios: Usuario[] = USUARIOS_INICIALES.map((u) => ({ ...u, grupos: [...u.grupos] }));

  public async getAll(): Promise<Usuario[]> {
    return this.usuarios.map((u) => ({ ...u, grupos: [...u.grupos] }));
  }

  public async getById(id_usuario: number): Promise<Usuario | undefined> {
    const usuario = this.usuarios.find((u) => u.id_usuario === id_usuario);
    return usuario ? { ...usuario, grupos: [...usuario.grupos] } : undefined;
  }

  public async add(nuevoUsuario: Usuario): Promise<void> {
    const id_usuario = Math.max(0, ...this.usuarios.map((u) => u.id_usuario)) + 1;
    this.usuarios.push({
      ...nuevoUsuario,
      id_usuario,
      nombre_completo: `${nuevoUsuario.nombres} ${nuevoUsuario.apellidos}`,
    });
  }

  public async update(id_usuario: number, usuarioModificado: Usuario): Promise<void> {
    const index = this.usuarios.findIndex((u) => u.id_usuario === id_usuario);
    if (index === -1) return;
    this.usuarios[index] = {
      ...usuarioModificado,
      id_usuario,
      nombre_completo: `${usuarioModificado.nombres} ${usuarioModificado.apellidos}`,
    };
  }

  public async delete(id_usuario: number): Promise<void> {
    this.usuarios = this.usuarios.filter((u) => u.id_usuario !== id_usuario);
  }
}
