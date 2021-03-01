import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBlockComponent } from './dialog-block.component';

describe('DialogBlockComponent', () => {
  let component: DialogBlockComponent;
  let fixture: ComponentFixture<DialogBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
