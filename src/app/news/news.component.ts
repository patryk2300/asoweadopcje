import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news$: Subscription;

  news;

  display: string;

  image: string;

  index: number;

  constructor(private galleryService: GalleryService, private router: Router) { }

  ngOnInit() {
    let id = this.router.url.replace('/news/', '');
    console.log(id);
    this.news$ = this.galleryService.getDoc('news', id).valueChanges()
      .subscribe(doc => this.news = doc);
  }

  ngOnDestroy(): void {
    this.news$.unsubscribe();
  }

  changeImage(dir: number){
    if(dir === 1 && this.index + dir < this.news.images.length)
      this.index += dir;
    else if (dir === -1 && this.index + dir >= 0)
      this.index += dir;
    else if (dir === 1)
      this.index = 0;
    else if (dir === -1)
      this.index = this.news.images.length - 1;

      this.image = this.news.images[this.index].downloadUrl
  }

  displayImage(downloadUrl: string){
    this.index = this.news.images.findIndex(element => {return element === downloadUrl;});
    this.display = 'block'; 
    this.image = downloadUrl;
  }
}