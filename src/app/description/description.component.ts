import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  name: string;
  imgUrl: string;

  constructor(private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.queryParams
      .subscribe(params => {
        this.name = params.name;
        this.imgUrl = params.imgUrl;
      });
  }

}
