import { TestBed } from '@angular/core/testing';

import { LivemessageService } from './livemessage.service';

describe('LivemessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LivemessageService = TestBed.get(LivemessageService);
    expect(service).toBeTruthy();
  });
});
