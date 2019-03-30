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
  
  path: string = 'main-menu';

  constructor(private galleryService: GalleryService, private router: Router) { }

  ngOnInit() {
    this.images$ = this.galleryService.get('main-menu');
    this.news$ = this.galleryService.get('news');
  }

  navigate(dogName: string){
    this.router.navigateByUrl(`/gallery/${dogName}`);
  }
  
  remove(dog: string){
    this.galleryService.removeBanner(dog);
  }
}
