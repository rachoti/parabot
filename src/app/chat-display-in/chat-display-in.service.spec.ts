import { TestBed } from '@angular/core/testing';

import { ChatDisplayInService } from './chat-display-in.service';

describe('ChatDisplayInService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatDisplayInService = TestBed.get(ChatDisplayInService);
    expect(service).toBeTruthy();
  });
});
