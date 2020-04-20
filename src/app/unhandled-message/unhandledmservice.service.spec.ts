import { TestBed } from '@angular/core/testing';

import { UnhandledmserviceService } from './unhandledmservice.service';

describe('UnhandledmserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnhandledmserviceService = TestBed.get(UnhandledmserviceService);
    expect(service).toBeTruthy();
  });
});
