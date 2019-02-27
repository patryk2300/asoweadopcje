import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FileManagerService } from './file-manager.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  gallery$: Observable<any>;
  galleryRef: AngularFirestoreCollection;
  basePath: string = '/gallery';
  current;
  
  constructor(private db: AngularFirestore, private uplService: FileManagerService) {
    this.galleryRef = this.db.collection(this.basePath);
  }

    get(){
      this.gallery$ = this.galleryRef.get(); 
    }

    remove(item){
      this.galleryRef.doc(`${ item.id }`).delete();
    }

    updateName(item, name){
      let newItem = JSON.parse(JSON.stringify(item.name));
      newItem.name = name;
      
      this.galleryRef.doc(`${ item.id }`).update(newItem);
      
    }

    get currentDog(){
      return this.current;
    }
    
    set currentDog(dog){
      this.current = dog;
    }
}
