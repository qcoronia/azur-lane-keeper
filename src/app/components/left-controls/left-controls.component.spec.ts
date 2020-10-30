import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftControlsComponent } from './left-controls.component';

describe('LeftControlsComponent', () => {
  let component: LeftControlsComponent;
  let fixture: ComponentFixture<LeftControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
