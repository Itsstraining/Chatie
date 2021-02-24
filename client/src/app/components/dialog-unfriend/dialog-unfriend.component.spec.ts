import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUnfriendComponent } from './dialog-unfriend.component';

describe('DialogUnfriendComponent', () => {
  let component: DialogUnfriendComponent;
  let fixture: ComponentFixture<DialogUnfriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUnfriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUnfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
