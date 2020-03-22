import { TestBed } from '@angular/core/testing';

import { TransearchService } from './transearch.service';

describe('TransearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransearchService = TestBed.get(TransearchService);
    expect(service).toBeTruthy();
  });
});
