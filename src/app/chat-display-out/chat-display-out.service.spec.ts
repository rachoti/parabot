import { TestBed } from '@angular/core/testing';

import { ChatDisplayOutService } from './chat-display-out.service';

describe('ChatDisplayOutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatDisplayOutService = TestBed.get(ChatDisplayOutService);
    expect(service).toBeTruthy();
  });
});
