import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHomeButtonComponent } from './header-home-button.component';

describe('HeaderHomeButtonComponent', () => {
  let component: HeaderHomeButtonComponent;
  let fixture: ComponentFixture<HeaderHomeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderHomeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderHomeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
