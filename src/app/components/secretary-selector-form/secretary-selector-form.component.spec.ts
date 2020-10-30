import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretarySelectorFormComponent } from './secretary-selector-form.component';

describe('SecretarySelectorFormComponent', () => {
  let component: SecretarySelectorFormComponent;
  let fixture: ComponentFixture<SecretarySelectorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretarySelectorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretarySelectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
