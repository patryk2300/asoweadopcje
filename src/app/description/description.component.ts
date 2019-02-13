import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  name: string;
  mainImage: string;
  images: [];
  desc: string;

  constructor(private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.queryParams
      .subscribe(params => {
        this.name = params.name;
        this.mainImage = params.mainImage;
        this.images = params.subImages;
        this.desc = params.desc;
        console.log(params);
      });
  }

}
