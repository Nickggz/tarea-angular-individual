// En este archivo va el test unitario de la página EditarUsuarioPage. Sirve para
// comprobar que la página se crea recibiendo un id_usuario. Se usa con "npm test".

import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarUsuarioPage } from './editar-usuario.page';

describe('EditarUsuarioPage', () => {
  let component: EditarUsuarioPage;
  let fixture: ComponentFixture<EditarUsuarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarUsuarioPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarUsuarioPage);
    fixture.componentRef.setInput('id_usuario', '1');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
