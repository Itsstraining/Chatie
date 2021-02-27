import { TestBed } from '@angular/core/testing';

import { ChatpageGuardGuard } from './chatpage-guard.guard';

describe('ChatpageGuardGuard', () => {
  let guard: ChatpageGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChatpageGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
