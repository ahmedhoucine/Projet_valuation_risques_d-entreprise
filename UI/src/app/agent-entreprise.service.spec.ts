import { TestBed } from '@angular/core/testing';

import { AgentEntrepriseService } from './agent-entreprise.service';

describe('AgentEntrepriseService', () => {
  let service: AgentEntrepriseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentEntrepriseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
