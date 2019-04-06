import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileManagerService } from '../services/file-manager.service';
import { Upload } from '../file-upload/upload';
import { GalleryCard } from './gallery-card';
import { NgForm } from '@angular/forms';

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

  uploadFile(galleryCard: GalleryCard){
    if(this.mainImg && this.fileList){
      let upload = new Upload(this.mainImg);
      
      
      const path = `gallery`;
      const id = Math.floor((Math.random() * 1000000) + 1);
      
      

      console.log(galleryCard);

      upload.mainFile = this.mainImg;
      upload.name = this.mainImg.name;
      upload.attach = id;
      
      this.fileManager.pushData(galleryCard, path, id).then(() => {
        this.fileManager.pushUpload(upload, path);

        Array.from(this.fileList).forEach((file) => {
          let upload = new Upload(file);

          upload.name = file.name;
          upload.file = file;
          upload.attach = id;

          this.fileManager.pushUpload(upload, path);
        });
      });
    }
  }

  onSubmit(f: NgForm){
    let galleryCard = new GalleryCard();

    galleryCard = f.value;
    galleryCard.images = [];
    galleryCard.mainImg = {
      downloadUrl: '',
      imgName: ''
    }

    this.uploadFile(galleryCard);
    this.closeModal();
  }

}
