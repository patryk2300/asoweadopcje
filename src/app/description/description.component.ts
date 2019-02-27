import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  dog;

  constructor(private service: GalleryService) { }

  ngOnInit() {
    if(this.service.currentDog)
      this.dog = this.service.currentDog;
  }

}
