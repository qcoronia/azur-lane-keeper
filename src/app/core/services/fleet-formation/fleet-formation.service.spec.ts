import { TestBed } from '@angular/core/testing';

import { FleetFormationService } from './fleet-formation.service';

describe('FleetFormationService', () => {
  let service: FleetFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
