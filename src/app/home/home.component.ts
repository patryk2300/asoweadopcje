import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  images$: Observable<any>;
  
  path: string = 'main-menu';

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.images$ = this.galleryService.get(this.path);
  }

}
