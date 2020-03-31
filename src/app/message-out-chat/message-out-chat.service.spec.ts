import { TestBed } from '@angular/core/testing';

import { MessageOutChatService } from './message-out-chat.service';

describe('MessageOutChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageOutChatService = TestBed.get(MessageOutChatService);
    expect(service).toBeTruthy();
  });
});
