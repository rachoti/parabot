import { TestBed } from '@angular/core/testing';

import { SentichatdispService } from './sentichatdisp.service';

describe('SentichatdispService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SentichatdispService = TestBed.get(SentichatdispService);
    expect(service).toBeTruthy();
  });
});
