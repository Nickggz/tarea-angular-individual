// En este archivo va el test unitario de la página CrearTareaPage. Sirve para comprobar
// que la página se crea. Se usa con "npm test".

import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearTareaPage } from './crear-tarea.page';

describe('CrearTareaPage', () => {
  let component: CrearTareaPage;
  let fixture: ComponentFixture<CrearTareaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTareaPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearTareaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
