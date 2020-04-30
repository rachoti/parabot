import { TestBed } from '@angular/core/testing';

import { LogindumService } from './logindum.service';

describe('LogindumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogindumService = TestBed.get(LogindumService);
    expect(service).toBeTruthy();
  });
});
