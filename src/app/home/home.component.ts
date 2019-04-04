import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  navigate(path: string, id?: string){
    let destPath = `/${path}`;
    
    if(id)
      destPath += `/${id}`

    this.router.navigateByUrl(destPath);
  }
  
  remove(dog: string){
    this.galleryService.removeBanner(dog);
  }
}
