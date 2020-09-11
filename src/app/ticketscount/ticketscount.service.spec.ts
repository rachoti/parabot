import { TestBed } from '@angular/core/testing';

import { TicketscountService } from './ticketscount.service';

describe('TicketscountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketscountService = TestBed.get(TicketscountService);
    expect(service).toBeTruthy();
  });
});
