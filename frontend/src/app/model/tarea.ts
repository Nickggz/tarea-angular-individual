// En este archivo va el tipo Tarea, con los mismos campos que la tabla tareas de la API,
// y las prioridades posibles. Sirve para tipar las tareas en el servicio, las páginas y
// TareaCard. Se usa importando Tarea donde se necesite.

import { Grupo } from './usuario';

export type Prioridad = '0:baja' | '1:media' | '2:alta';

export const PRIORIDADES: Prioridad[] = ['0:baja', '1:media', '2:alta'];

export type EstadoTarea = 'Abierta' | 'Cerrada';

export type Tarea = {
  id_tarea: number;
  id_creador: number;
  grupo: Grupo;
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
  creada: string;
  terminada: string | null;
  estado: EstadoTarea;
};
