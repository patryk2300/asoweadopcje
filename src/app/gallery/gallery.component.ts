import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryService } from '../services/gallery.service';
import { UploadFileService } from '../services/upload-file.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  dogs$: any;
  imgUrl: any;

  constructor(private router: Router, private service: GalleryService, private fileService: UploadFileService) { }
  
  ngOnInit() {
    this.dogs$ = this.service.get();
    this.imgUrl = this.fileService.getImage('');
  }

  remove(dog){
    this.service.remove(dog);
  }

  navigate(dog: {name: string, imgUrl: string}){
    this.router.navigate(['/gallery/name'], {queryParams: { name: dog.name, imgUrl: dog.imgUrl }})
  }
}