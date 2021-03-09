import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelConverDialogComponent } from './del-conver-dialog.component';

describe('DelConverDialogComponent', () => {
  let component: DelConverDialogComponent;
  let fixture: ComponentFixture<DelConverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelConverDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelConverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
