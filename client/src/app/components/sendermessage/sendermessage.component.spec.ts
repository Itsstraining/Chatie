import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendermessageComponent } from './sendermessage.component';

describe('SendermessageComponent', () => {
  let component: SendermessageComponent;
  let fixture: ComponentFixture<SendermessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendermessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendermessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
