import { Component, OnInit } from '@angular/core';
import { GalleryComponent } from '../gallery/gallery.component';
import { Upload } from './upload';
import { FileManagerService } from '../services/file-manager.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  dogName: string;
  selectedFile: File;
  fileList: FileList;
  imgsrc;

  constructor(private gallery: GalleryComponent, private fileManager: FileManagerService, private storage: AngularFireStorage) 
  { 
  }

  ngOnInit() {
  }

  discard(){
    this.gallery.toAdd = !this.gallery.toAdd;
  }

  detectFile(event){
    this.fileList = event.target.files;
  }

  uploadFile(){
    if(this.fileList.item(0)){
      let file = this.fileList.item(0);
      let upload = new Upload(file);
      upload.name = file.name;
      upload.attach = this.dogName.charAt(0).toUpperCase() + this.dogName.slice(1).toLowerCase();
      this.fileManager.pushUpload(upload, this.dogName);  
    }
  }

  apply(){
    this.uploadFile();

    this.gallery.toAdd = !this.gallery.toAdd;
  }

}
