import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushnotifyingComponent } from './pushnotifying.component';

describe('PushnotifyingComponent', () => {
  let component: PushnotifyingComponent;
  let fixture: ComponentFixture<PushnotifyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushnotifyingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PushnotifyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
