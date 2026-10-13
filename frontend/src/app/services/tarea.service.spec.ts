// En este archivo va el test unitario de TareaService. Sirve para comprobar que el
// servicio se crea. Se usa con "npm test".

import { TestBed } from '@angular/core/testing';
import { TareaService } from './tarea.service';

describe('TareaService', () => {
  let service: TareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
