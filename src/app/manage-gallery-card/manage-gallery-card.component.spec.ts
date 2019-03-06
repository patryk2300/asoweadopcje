import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGalleryCardComponent } from './manage-gallery-card.component';

describe('ManageGalleryCardComponent', () => {
  let component: ManageGalleryCardComponent;
  let fixture: ComponentFixture<ManageGalleryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGalleryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGalleryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
