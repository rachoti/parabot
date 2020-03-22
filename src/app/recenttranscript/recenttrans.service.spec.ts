import { TestBed } from '@angular/core/testing';

import { RecenttransService } from './recenttrans.service';

describe('RecenttransService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecenttransService = TestBed.get(RecenttransService);
    expect(service).toBeTruthy();
  });
});
