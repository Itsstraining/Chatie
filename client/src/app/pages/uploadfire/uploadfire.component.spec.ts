import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadfireComponent } from './uploadfire.component';

describe('UploadfireComponent', () => {
  let component: UploadfireComponent;
  let fixture: ComponentFixture<UploadfireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadfireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadfireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
