import { TestBed } from '@angular/core/testing';

import { ShipgirlService } from './shipgirl.service';

describe('ShipgirlService', () => {
  let service: ShipgirlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipgirlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
