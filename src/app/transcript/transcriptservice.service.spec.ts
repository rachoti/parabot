import { TestBed } from '@angular/core/testing';

import { TranscriptserviceService } from './transcriptservice.service';

describe('TranscriptserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranscriptserviceService = TestBed.get(TranscriptserviceService);
    expect(service).toBeTruthy();
  });
});
