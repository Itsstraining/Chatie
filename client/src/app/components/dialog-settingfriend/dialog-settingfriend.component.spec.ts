import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSettingfriendComponent } from './dialog-settingfriend.component';

describe('DialogSettingfriendComponent', () => {
  let component: DialogSettingfriendComponent;
  let fixture: ComponentFixture<DialogSettingfriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSettingfriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSettingfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
