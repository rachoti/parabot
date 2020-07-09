import { TestBed } from '@angular/core/testing';

import { SentinextService } from './sentinext.service';

describe('SentinextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SentinextService = TestBed.get(SentinextService);
    expect(service).toBeTruthy();
  });
});
