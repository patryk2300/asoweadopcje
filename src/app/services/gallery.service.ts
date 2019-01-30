import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  gallery$: Observable<{}>;
  galleryRef: AngularFireList<{}>;

  constructor(private db: AngularFireDatabase) {

    this.galleryRef = this.db.list('/gallery');

    this.gallery$ = this.db.list('/gallery').snapshotChanges().pipe(
      map(changes => changes.map(change => ({
        key: change.payload.key,
        value: change.payload.val()
      })))
    );
    }

    get(){
      return this.gallery$;
    }

    remove(item){
      this.galleryRef.remove(item.key);
    }
}
