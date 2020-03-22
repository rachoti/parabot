import { TestBed } from '@angular/core/testing';

import { MessagecountService } from './messagecount.service';

describe('MessagecountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagecountService = TestBed.get(MessagecountService);
    expect(service).toBeTruthy();
  });
});
