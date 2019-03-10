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

  display: string = "none";
  currentUrl: string;

  constructor(private service: GalleryService, private router: Router) { }

  ngOnInit() {
    if(this.service.currentDog){
      this.dog = this.service.currentDog;
    
    } else{
      let name = this.router.url.replace('/gallery/','');
      this.dog = this.service.getDoc(name)
        .valueChanges()
        .subscribe((value) => this.dog = value);
    }
  }

}
