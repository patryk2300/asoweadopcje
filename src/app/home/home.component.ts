import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  images$: Observable<any>;

  news$: Observable<any>

  toEdit: boolean = false;

  constructor(private galleryService: GalleryService, private router: Router) { }

  ngOnInit() {
    this.images$ = this.galleryService.get('main-menu');
    this.news$ = this.galleryService.get('news');
  }

  navigate(path: string, dogName?: string){
    
    let destPath = `/${path}`;

    this.galleryService.findDogId(path, dogName)
      .then(value => {
        let id = value.docs.shift().id
        
        destPath += `/${id}`
        this.router.navigateByUrl(destPath);
      })
  }

  navigateById(path: string, id: any){
    
    let destPath = `/${path}/${id}`;

    this.router.navigateByUrl(destPath);
  }
  
  remove(item, id?){

    if(id)
      this.galleryService.removeCard(item, 'news');
    else
      this.galleryService.removeBanner(item);
  }

  onSubmit(f: NgForm){
    console.log(f.value);
    this.toEdit = !this.toEdit;
  }
}
