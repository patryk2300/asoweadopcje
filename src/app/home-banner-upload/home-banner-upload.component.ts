import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileManagerService } from '../services/file-manager.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'home-banner-upload',
  templateUrl: './home-banner-upload.component.html',
  styleUrls: ['./home-banner-upload.component.scss']
})
export class HomeBannerUploadComponent {

  file: File;

  constructor(public activeModal: NgbActiveModal, private fileService: FileManagerService) { }

  detectUpload(event: File){
    this.file = event;
  }

  onSubmit(f: NgForm){
    if(f.valid && this.file){
      this.fileService.pushUploadMainMenu(f.value.dogName, f.value.imgDesc, this.file);
      this.activeModal.dismiss();
    }
    else
      alert('Nie wgrano zdjęcia bądź opisu !');
  }

}
