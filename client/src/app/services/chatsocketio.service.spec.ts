import { TestBed } from '@angular/core/testing';

import { ChatsocketioService } from './chatsocketio.service';

describe('ChatsocketioService', () => {
  let service: ChatsocketioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatsocketioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
