import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsUploadComponent } from './news-upload.component';

describe('NewsUploadComponent', () => {
  let component: NewsUploadComponent;
  let fixture: ComponentFixture<NewsUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
