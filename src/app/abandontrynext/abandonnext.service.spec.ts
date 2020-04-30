import { TestBed } from '@angular/core/testing';

import { AbandonnextService } from './abandonnext.service';

describe('AbandonnextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbandonnextService = TestBed.get(AbandonnextService);
    expect(service).toBeTruthy();
  });
});
