import { TestBed } from '@angular/core/testing';

import { AbandonmsgserviceService } from './abandonmsgservice.service';

describe('AbandonmsgserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbandonmsgserviceService = TestBed.get(AbandonmsgserviceService);
    expect(service).toBeTruthy();
  });
});
