// En este archivo va el test unitario de la página EditarTareaPage. Sirve para comprobar
// que la página se crea recibiendo un id_tarea. Se usa con "npm test".

import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTareaPage } from './editar-tarea.page';

describe('EditarTareaPage', () => {
  let component: EditarTareaPage;
  let fixture: ComponentFixture<EditarTareaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTareaPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarTareaPage);
    fixture.componentRef.setInput('id_tarea', '1');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
