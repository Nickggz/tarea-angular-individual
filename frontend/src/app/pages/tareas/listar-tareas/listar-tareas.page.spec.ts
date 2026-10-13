// En este archivo va el test unitario de la página ListarTareasPage. Sirve para comprobar
// que la página se crea. Se usa con "npm test".

import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarTareasPage } from './listar-tareas.page';

describe('ListarTareasPage', () => {
  let component: ListarTareasPage;
  let fixture: ComponentFixture<ListarTareasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTareasPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarTareasPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
