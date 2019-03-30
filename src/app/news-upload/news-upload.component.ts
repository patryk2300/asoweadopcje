import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news-upload',
  templateUrl: './news-upload.component.html',
  styleUrls: ['./news-upload.component.scss']
})
export class NewsUploadComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  detectUpload(event){
    console.log(event);
  }
}
