import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryService } from '../services/gallery.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private db: AngularFirestore, 
    private authService: AuthService,
    private modalService: NgbModal ) {}
  
  ngOnInit() {
    this.dogs$ = this.db
    .collection('/gallery')
    .snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map(a => {
          
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data};
        });
    }));
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

    this.router.navigate([`/gallery/${ dog.name }`]);
  }

  openFormModal() {
    const modalRef = this.modalService.open(ManageGalleryCardComponent);

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => (console.log(error)));
  }
}