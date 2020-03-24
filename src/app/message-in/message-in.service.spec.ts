import { TestBed } from '@angular/core/testing';

import { MessageInService } from './message-in.service';

describe('MessageInService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageInService = TestBed.get(MessageInService);
    expect(service).toBeTruthy();
  });
});
