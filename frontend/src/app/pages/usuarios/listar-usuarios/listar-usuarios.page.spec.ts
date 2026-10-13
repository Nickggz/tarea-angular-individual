// En este archivo va el test unitario de la página ListarUsuariosPage. Sirve para
// comprobar que la página se crea. Se usa con "npm test".

import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarUsuariosPage } from './listar-usuarios.page';

describe('ListarUsuariosPage', () => {
  let component: ListarUsuariosPage;
  let fixture: ComponentFixture<ListarUsuariosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarUsuariosPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarUsuariosPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
