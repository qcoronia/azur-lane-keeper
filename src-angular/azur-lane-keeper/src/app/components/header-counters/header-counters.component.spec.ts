import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCountersComponent } from './header-counters.component';

describe('HeaderCountersComponent', () => {
  let component: HeaderCountersComponent;
  let fixture: ComponentFixture<HeaderCountersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderCountersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
