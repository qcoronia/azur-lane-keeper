import { TestBed } from '@angular/core/testing';

import { DockNotesService } from './dock-notes.service';

describe('DockNotesService', () => {
  let service: DockNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DockNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
