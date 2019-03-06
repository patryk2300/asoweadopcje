import { Component, Inject } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileManagerService } from '../services/file-manager.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Upload } from '../file-upload/upload';
import { map } from 'rxjs/operators';

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
    private service: GalleryService,
    public activeModal: NgbActiveModal, 
    private fileManager: FileManagerService,) {

    this.dog = this.service.currentDog;
  }

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
      this.fileManager.saveFileData(upload).then(() => {
        this.fileManager.pushUpload(upload);

        Array.from(this.fileList).forEach((file) => {
          let upload = new Upload(file);

          upload.name = file.name;
          upload.file = file;
          upload.attach = this.dogName.charAt(0).toUpperCase() + this.dogName.slice(1).toLowerCase();

          this.fileManager.pushUpload(upload);
        });
      });

      
    }
  }

  apply(){
    this.uploadFile();
    this.closeModal();
  }

}
