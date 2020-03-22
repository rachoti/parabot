import { TestBed } from '@angular/core/testing';

import { GeomapService } from './geomap.service';

describe('GeomapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeomapService = TestBed.get(GeomapService);
    expect(service).toBeTruthy();
  });
});
