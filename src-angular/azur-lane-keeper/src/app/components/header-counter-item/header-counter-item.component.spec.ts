import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCounterItemComponent } from './header-counter-item.component';

describe('HeaderCounterItemComponent', () => {
  let component: HeaderCounterItemComponent;
  let fixture: ComponentFixture<HeaderCounterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCounterItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCounterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
