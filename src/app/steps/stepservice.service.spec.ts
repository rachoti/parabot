import { TestBed } from '@angular/core/testing';

import { StepserviceService } from './stepservice.service';

describe('StepserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepserviceService = TestBed.get(StepserviceService);
    expect(service).toBeTruthy();
  });
});
