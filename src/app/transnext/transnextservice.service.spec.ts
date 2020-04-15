import { TestBed } from '@angular/core/testing';

import { TransnextserviceService } from './transnextservice.service';

describe('TransnextserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransnextserviceService = TestBed.get(TransnextserviceService);
    expect(service).toBeTruthy();
  });
});
