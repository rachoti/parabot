import { TestBed } from '@angular/core/testing';

import { MessageInChatService } from './message-in-chat.service';

describe('MessageInChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageInChatService = TestBed.get(MessageInChatService);
    expect(service).toBeTruthy();
  });
});
