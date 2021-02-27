import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSignupComponent } from './chat-signup.component';

describe('ChatSignupComponent', () => {
  let component: ChatSignupComponent;
  let fixture: ComponentFixture<ChatSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
