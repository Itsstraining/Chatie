import { TestBed } from '@angular/core/testing';

import { PushNotiService } from './push-noti.service';

describe('PushNotiService', () => {
  let service: PushNotiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushNotiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
