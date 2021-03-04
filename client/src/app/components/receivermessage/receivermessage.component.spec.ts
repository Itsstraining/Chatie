import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivermessageComponent } from './receivermessage.component';

describe('ReceivermessageComponent', () => {
  let component: ReceivermessageComponent;
  let fixture: ComponentFixture<ReceivermessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivermessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivermessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
