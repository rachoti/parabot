import { TestBed } from '@angular/core/testing';

import { MessageOutService } from './message-out.service';

describe('MessageOutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageOutService = TestBed.get(MessageOutService);
    expect(service).toBeTruthy();
  });
});
