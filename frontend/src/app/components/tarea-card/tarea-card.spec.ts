// En este archivo va el test unitario del componente TareaCard. Sirve para comprobar que
// el componente se crea recibiendo una tarea. Se usa con "npm test".

import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaCard } from './tarea-card';

describe('TareaCard', () => {
  let component: TareaCard;
  let fixture: ComponentFixture<TareaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TareaCard);
    fixture.componentRef.setInput('tarea', { id_tarea: 1, id_creador: 1, grupo: 'user', titulo: 'T', descripcion: '', prioridad: '1:media', creada: new Date().toISOString(), terminada: null, estado: 'Abierta' });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
