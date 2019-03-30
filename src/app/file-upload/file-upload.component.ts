import { Component, Output, EventEmitter } from '@angular/core';
import { ManageGalleryCardComponent } from '../manage-gallery-card/manage-gallery-card.component';


@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Output('selectedEvent') selectedEvent: EventEmitter<any> = new EventEmitter<any>();
  
  isHovering: boolean;
  isSelected: boolean;

  fileList: FileList;

  constructor() {}
  // private galleryCard: ManageGalleryCardComponent
  detectUpload(event: FileList){
    this.isSelected = true;
    this.selectedEvent.emit(event);
    this.fileList = event;
  }

  toggleHover(event: boolean){
    this.isHovering = event;
  }

  

}
