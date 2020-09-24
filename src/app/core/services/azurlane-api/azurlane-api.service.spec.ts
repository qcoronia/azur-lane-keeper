import { TestBed } from '@angular/core/testing';

import { AzurLaneApiService } from './azurlane-api.service';

describe('AzurLaneApiService', () => {
  let service: AzurLaneApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzurLaneApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
