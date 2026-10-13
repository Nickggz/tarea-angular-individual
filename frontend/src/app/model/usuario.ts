// En este archivo va el tipo Usuario, con los mismos campos que la tabla usuarios de la
// API, y los grupos posibles. Sirve para tipar los usuarios en el servicio, las páginas y
// UsuarioForm. Se usa importando Usuario donde se necesite.

export type Grupo = 'user' | 'admin' | 'superadmin';

export const GRUPOS: Grupo[] = ['superadmin', 'admin', 'user'];

export type Usuario = {
  id_usuario: number;
  username: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  nombre_completo: string;
  grupos: Grupo[];
  activo: boolean;
};
