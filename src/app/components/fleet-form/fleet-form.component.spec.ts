import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetFormComponent } from './fleet-form.component';

describe('FleetFormComponent', () => {
  let component: FleetFormComponent;
  let fixture: ComponentFixture<FleetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
