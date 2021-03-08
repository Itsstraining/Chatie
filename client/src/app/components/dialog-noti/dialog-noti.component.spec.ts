import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNotiComponent } from './dialog-noti.component';

describe('DialogNotiComponent', () => {
  let component: DialogNotiComponent;
  let fixture: ComponentFixture<DialogNotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNotiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
