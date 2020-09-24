import { TestBed } from '@angular/core/testing';

import { ImageCacherInterceptor } from './image-cacher.interceptor';

describe('ImageCacherInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ImageCacherInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ImageCacherInterceptor = TestBed.inject(ImageCacherInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
