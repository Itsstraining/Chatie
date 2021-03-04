import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedMsgComponent } from './received-msg.component';

describe('ReceivedMsgComponent', () => {
  let component: ReceivedMsgComponent;
  let fixture: ComponentFixture<ReceivedMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
