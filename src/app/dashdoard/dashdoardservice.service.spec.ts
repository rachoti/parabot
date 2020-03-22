import { TestBed } from '@angular/core/testing';

import { DashdoardserviceService } from './dashdoardservice.service';

describe('DashdoardserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashdoardserviceService = TestBed.get(DashdoardserviceService);
    expect(service).toBeTruthy();
  });
});
