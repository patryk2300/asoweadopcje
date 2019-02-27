import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryService } from '../services/gallery.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

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

  constructor(private router: Router, private service: GalleryService, private db: AngularFirestore, private authService: AuthService) {}
  
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
    this.service.remove(dog);
  }

  add(){
    this.toAdd = !this.toAdd;
  }

  edit(){
    this.toEdit = !this.toEdit;
  }
  
  // updateName(dog){
  //   this.service.updateName(dog, this.title);
  //   this.toEdit = !this.toEdit;
  // }

  navigate(dog){
    this.service.currentDog = dog;

    this.router.navigate([`/gallery/${ dog.name }`]);
  }
}