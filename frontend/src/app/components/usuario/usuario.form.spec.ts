// En este archivo va el test unitario del componente UsuarioForm. Sirve para comprobar
// que el formulario se crea recibiendo un usuario. Se usa con "npm test".

import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioForm } from './usuario.form';

describe('UsuarioForm', () => {
  let component: UsuarioForm;
  let fixture: ComponentFixture<UsuarioForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioForm],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioForm);
    fixture.componentRef.setInput('usuario', { id_usuario: 1, username: 'u', nombres: 'N', apellidos: 'A', fecha_nacimiento: '2000-01-01', nombre_completo: 'N A', grupos: ['user'], activo: true });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
