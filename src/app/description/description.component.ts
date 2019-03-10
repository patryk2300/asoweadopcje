import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})

export class DescriptionComponent implements OnInit {
  dog;
  imgs;

  image;

  display: string = "none";
  currentUrl: string;
  index: number;

  constructor(private service: GalleryService, private router: Router) { }

  ngOnInit() {
    if(this.service.currentDog){
      this.dog = this.service.currentDog;
      this.imgs = this.dog.images;
    
    } else{
      let name = this.router.url.replace('/gallery/','');
      this.dog = this.service.getDoc(name)
        .valueChanges()
        .subscribe((value) => {
          this.dog = value;
          this.imgs = this.dog.images;
        });
    }
  }
  
  changeImage(dir: number){
    
    if(dir === 1 && this.index + dir < this.imgs.length)
      this.index += dir;
    else if (dir === -1 && this.index + dir > this.imgs.length)
      this.index += dir;
    else if (dir === 1)
      this.index = 0;
    else
      this.index = this.imgs.length - 1;

      this.image = this.imgs[this.index].downloadUrl
  }

  displayImage(downloadUrl: string){
    this.index = this.imgs.findIndex(element => {return element === downloadUrl;});
    this.display = 'block'; 
    this.currentUrl = downloadUrl;
    this.image = downloadUrl;
    console.log(downloadUrl)
  }

}
