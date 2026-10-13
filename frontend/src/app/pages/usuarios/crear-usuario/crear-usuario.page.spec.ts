// En este archivo va el test unitario de la página CrearUsuarioPage. Sirve para comprobar
// que la página se crea. Se usa con "npm test".

import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearUsuarioPage } from './crear-usuario.page';

describe('CrearUsuarioPage', () => {
  let component: CrearUsuarioPage;
  let fixture: ComponentFixture<CrearUsuarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearUsuarioPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearUsuarioPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
