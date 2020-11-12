import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockGridComponent } from './dock-grid.component';

describe('DockGridComponent', () => {
  let component: DockGridComponent;
  let fixture: ComponentFixture<DockGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
