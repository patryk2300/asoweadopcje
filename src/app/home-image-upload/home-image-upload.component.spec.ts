import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeImageUploadComponent } from './home-image-upload.component';

describe('HomeImageUploadComponent', () => {
  let component: HomeImageUploadComponent;
  let fixture: ComponentFixture<HomeImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
