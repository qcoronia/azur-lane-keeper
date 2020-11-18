import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockGridControlsComponent } from './dock-grid-controls.component';

describe('DockGridControlsComponent', () => {
  let component: DockGridControlsComponent;
  let fixture: ComponentFixture<DockGridControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockGridControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockGridControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
