import { TestBed } from '@angular/core/testing';

import { EntrepriserisqueService } from './entrepriserisque.service';

describe('EntrepriserisqueService', () => {
  let service: EntrepriserisqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrepriserisqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
