import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryService } from '../services/gallery.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ManageGalleryCardComponent } from '../manage-gallery-card/manage-gallery-card.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  dogs$: any;

  title: string;

  toEdit: boolean;
  toAdd: boolean;

  constructor(
    private router: Router, 
    private service: GalleryService,
    private authService: AuthService,) {}
  
  ngOnInit() {
    this.dogs$ = this.service.gallery$;
  }

  remove(dog){
    this.service.removeCard(dog);
  }

  add(){
    this.toAdd = !this.toAdd;
  }

  edit(){
    this.toEdit = !this.toEdit;
  }

  navigate(dog){
    this.service.currentDog = dog;

    this.router.navigate([`/gallery/${ dog.dogName }`]);
  }
}