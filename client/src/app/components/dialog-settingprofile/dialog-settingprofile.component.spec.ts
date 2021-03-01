import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSettingprofileComponent } from './dialog-settingprofile.component';

describe('DialogSettingprofileComponent', () => {
  let component: DialogSettingprofileComponent;
  let fixture: ComponentFixture<DialogSettingprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSettingprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSettingprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
