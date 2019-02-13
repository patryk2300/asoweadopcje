import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryService } from '../services/gallery.service';
import { UploadFileService } from '../services/upload-file.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  dogs$: any;

  constructor(private router: Router, private service: GalleryService, private fileService: UploadFileService) { }
  
  ngOnInit() {
    this.dogs$ = this.service.get();
  }

  remove(dog){
    this.service.remove(dog);
  }

  navigate(dog: {name: string, images: {main: string, subImages: []}, desc: string}){
    console.log(dog.images.subImages)
    this.router.navigate(
      ['/gallery/name'], 
      {queryParams: { name: dog.name, mainImage: dog.images.main, subImages: dog.images.subImages, desc: dog.desc }})
  }
}