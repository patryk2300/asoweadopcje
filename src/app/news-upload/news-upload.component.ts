import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { NewsSchema } from './news-schema';
import { Upload } from '../file-upload/upload';
import { FileManagerService } from '../services/file-manager.service';

@Component({
  selector: 'app-news-upload',
  templateUrl: './news-upload.component.html',
  styleUrls: ['./news-upload.component.scss']
})
export class NewsUploadComponent implements OnInit {

  mainImg: File;
  images: FileList;

  constructor(public activeModal: NgbActiveModal, private fileManager: FileManagerService) { }

  ngOnInit() {
  }

  detectUpload(event){
    this.images = event;
  }

  uploadFiles(news: NewsSchema){
    const path = `news`
    const id = Math.floor((Math.random() * 1000000) + 1);

    let upload = new Upload(this.mainImg);
    upload.attach = id;
    upload.mainFile = this.mainImg;
    upload.name = this.mainImg.name;

    this.fileManager.pushData(news, path, id).then(() => {
      
      this.fileManager.pushUpload(upload, path, news);
  
      Array.from(this.images).forEach((file) => {
        let upload = new Upload(file);
        
        upload.attach = id;
        upload.name = file.name;

        this.fileManager.pushUpload(upload, path, news);
      });

    })
  }

  onSubmit(f: NgForm){
    let news = new NewsSchema();
    
    news = f.value;
    news.mainImg = {
      downloadUrl: '',
      imgName: ''
    };
    news.images = [];

    news.uploadedDate = new Date().toLocaleDateString();
    
    this.activeModal.dismiss();
    this.uploadFiles(news);
  }
}
