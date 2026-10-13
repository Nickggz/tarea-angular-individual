// En este archivo va TareaService, con un array de tareas con los mismos datos que la API
// (db/00.sql). Sirve como base de datos en memoria para las páginas de tareas. Se usa con
// inject(TareaService) y sus métodos getAll(), getById(), add(), update() y delete().

import { Service } from '@angular/core';
import { EstadoTarea, Tarea } from '../model/tarea';

function hace(horas: number): string {
  return new Date(Date.now() - horas * 60 * 60 * 1000).toISOString();
}
const DIA = 24;

const TAREAS_INICIALES: Omit<Tarea, 'estado'>[] = [
  { id_tarea: 1, id_creador: 1, grupo: 'superadmin', titulo: 'Promover a usuario jperez a rol admin', descripcion: 'Aprobar la solicitud de permisos elevados tras auditoría de seguridad.', prioridad: '2:alta', creada: hace(2 * DIA), terminada: null },
  { id_tarea: 2, id_creador: 1, grupo: 'superadmin', titulo: 'Depurar logs de auditoría del sistema', descripcion: 'Realizar purga de registros antiguos mayores a 90 días en la base de datos.', prioridad: '1:media', creada: hace(5 * DIA), terminada: hace(1 * DIA) },
  { id_tarea: 3, id_creador: 1, grupo: 'superadmin', titulo: 'Renovar llaves maestras de cifrado JWT', descripcion: 'Rotación anual de secretos para tokens de autenticación.', prioridad: '2:alta', creada: hace(1 * DIA), terminada: null },
  { id_tarea: 4, id_creador: 1, grupo: 'superadmin', titulo: 'Crear cuenta de administrador para auditoría externa', descripcion: 'Dar de alta al usuario temporal audit_ext con rol admin.', prioridad: '0:baja', creada: hace(3 * DIA), terminada: hace(2 * DIA) },

  { id_tarea: 5, id_creador: 1, grupo: 'admin', titulo: 'Revisar reportes de usuarios bloqueados', descripcion: 'Verificar intentos fallidos de inicio de sesión de la última semana.', prioridad: '1:media', creada: hace(12), terminada: null },
  { id_tarea: 6, id_creador: 1, grupo: 'admin', titulo: 'Actualizar documentación de la API', descripcion: 'Sincronizar la especificación Swagger con las rutas de Fastify recientemente agregadas.', prioridad: '0:baja', creada: hace(3 * DIA), terminada: null },
  { id_tarea: 7, id_creador: 1, grupo: 'admin', titulo: 'Monitorear uso de recursos del servidor', descripcion: 'Evaluar consumo de CPU y memoria tras el último despliegue.', prioridad: '2:alta', creada: hace(1 * DIA), terminada: hace(2) },
  { id_tarea: 8, id_creador: 1, grupo: 'admin', titulo: 'Mantenimiento programado de base de datos', descripcion: 'Ejecutar VACUUM ANALYZE durante la ventana de bajo tráfico.', prioridad: '1:media', creada: hace(4 * DIA), terminada: null },

  { id_tarea: 9, id_creador: 1, grupo: 'user', titulo: 'Verificar configuración del repositorio', descripcion: 'Verificar Verificar que el proyecto levanta y funciona sin problemas de configuraciòn.', prioridad: '0:baja', creada: hace(10 * DIA), terminada: hace(9 * DIA) },
  { id_tarea: 10, id_creador: 1, grupo: 'user', titulo: 'Seleccionar método de pago', descripcion: 'Seleccionar y fundamente el método de pago a usar en el proyecto.', prioridad: '2:alta', creada: hace(6), terminada: null },
  { id_tarea: 11, id_creador: 1, grupo: 'user', titulo: 'Tests', descripcion: 'Revisar que están funcionando los tests unitarios.', prioridad: '1:media', creada: hace(2 * DIA), terminada: null },
  { id_tarea: 12, id_creador: 1, grupo: 'user', titulo: 'Tests', descripcion: 'Revisar los tests de integración.', prioridad: '0:baja', creada: hace(1 * DIA), terminada: hace(4) },
];

function calcularEstado(terminada: string | null): EstadoTarea {
  return terminada ? 'Cerrada' : 'Abierta';
}

@Service()
export class TareaService {
  private tareas: Tarea[] = TAREAS_INICIALES.map((t) => ({
    ...t,
    estado: calcularEstado(t.terminada),
  }));

  public async getAll(): Promise<Tarea[]> {
    return this.tareas.map((t) => ({ ...t }));
  }

  public async getById(id_tarea: number): Promise<Tarea | undefined> {
    const tarea = this.tareas.find((t) => t.id_tarea === id_tarea);
    return tarea ? { ...tarea } : undefined;
  }

  public async add(nuevaTarea: Tarea): Promise<void> {
    const id_tarea = Math.max(0, ...this.tareas.map((t) => t.id_tarea)) + 1;
    this.tareas.push({
      ...nuevaTarea,
      id_tarea,
      creada: new Date().toISOString(),
      estado: calcularEstado(nuevaTarea.terminada),
    });
  }

  public async update(id_tarea: number, tareaModificada: Tarea): Promise<void> {
    const index = this.tareas.findIndex((t) => t.id_tarea === id_tarea);
    if (index === -1) return;
    this.tareas[index] = {
      ...tareaModificada,
      id_tarea,
      estado: calcularEstado(tareaModificada.terminada),
    };
  }

  public async delete(id_tarea: number): Promise<void> {
    this.tareas = this.tareas.filter((t) => t.id_tarea !== id_tarea);
  }
}
