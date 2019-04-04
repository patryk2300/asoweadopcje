import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileManagerService } from '../services/file-manager.service';
import { Upload } from '../file-upload/upload';

@Component({
  selector: 'manage-gallery-card',
  templateUrl: './manage-gallery-card.component.html',
  styleUrls: ['./manage-gallery-card.component.scss']
})
export class ManageGalleryCardComponent {
  
  dogName: string;
  desc: string;

  mainImg: File;
  fileList: FileList;
  
  imgsrc: any;
  
  dog: any;

  constructor(
    public activeModal: NgbActiveModal, 
    private fileManager: FileManagerService,) {}

  closeModal(){
    this.activeModal.close('Modal Closed');
  }

  detectFile(event){
    this.mainImg = event.target.files.item(0);
  }

  uploadFile(){
    if(this.mainImg && this.fileList){
      let upload = new Upload(this.mainImg);
      
      upload.mainFile = this.mainImg;
      upload.name = this.mainImg.name;
      upload.attach = this.dogName.charAt(0).toUpperCase() + this.dogName.slice(1).toLowerCase();
      upload.desc = this.desc;
      const path = `gallery`;
      
      this.fileManager.saveFileData(upload, path).then(() => {
        this.fileManager.pushUpload(upload, path);

        Array.from(this.fileList).forEach((file) => {
          let upload = new Upload(file);

          upload.name = file.name;
          upload.file = file;
          upload.attach = this.dogName.charAt(0).toUpperCase() + this.dogName.slice(1).toLowerCase();

          this.fileManager.pushUpload(upload, path);
        });
      });
    }
  }

  apply(){
    this.uploadFile();
    this.closeModal();
  }

}
