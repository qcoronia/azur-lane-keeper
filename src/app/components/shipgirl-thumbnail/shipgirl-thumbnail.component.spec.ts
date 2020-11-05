import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipgirlThumbnailComponent } from './shipgirl-thumbnail.component';

describe('ShipgirlThumbnailComponent', () => {
  let component: ShipgirlThumbnailComponent;
  let fixture: ComponentFixture<ShipgirlThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipgirlThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipgirlThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
