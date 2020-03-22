import { TestBed } from '@angular/core/testing';

import { GenderviewService } from './genderview.service';

describe('GenderviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenderviewService = TestBed.get(GenderviewService);
    expect(service).toBeTruthy();
  });
});
