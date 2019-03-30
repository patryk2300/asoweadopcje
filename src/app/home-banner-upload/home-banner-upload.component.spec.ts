import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerUploadComponent } from './home-banner-upload.component';

describe('HomeBannerUploadComponent', () => {
  let component: HomeBannerUploadComponent;
  let fixture: ComponentFixture<HomeBannerUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBannerUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBannerUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
