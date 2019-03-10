import { Component } from '@angular/core';
import { ManageGalleryCardComponent } from '../manage-gallery-card/manage-gallery-card.component';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  
  isHovering: boolean;
  isSelected: boolean;

  constructor(private galleryCard: ManageGalleryCardComponent) {}

  detectUpload(event: FileList){
    this.isSelected = true;
    this.galleryCard.fileList = event;
  }

  toggleHover(event: boolean){
    this.isHovering = event;
  }

  

}
