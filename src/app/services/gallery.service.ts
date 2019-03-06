import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileManagerService } from './file-manager.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  gallery$: Observable<any>;
  galleryRef: AngularFirestoreCollection;
  basePath: string = 'gallery/';
  current;
  
  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private fileManager: FileManagerService) {
    this.galleryRef = this.db.collection(this.basePath);
  }

    get(){
      this.gallery$ = this.galleryRef.get(); 
    }

    removeCard(item){
      let mainImg;
      let imgs: Array<any>;

      this.fileManager.getDoc(item.id)
        .toPromise()
        .then(doc => {
          mainImg = doc.get('mainImg');
          imgs = doc.get('images');
        })
        .then(() => {
          this.storage.ref(this.basePath).child(`${item.id}/${mainImg.imgName}`)
            .delete();
          imgs.forEach(img => {
            console.log(img.imgName);
            this.storage.ref(this.basePath).child(`${item.id}/${img.imgName}`)
              .delete();
          });
        })
        .then(() => {
          this.db.collection(this.basePath).doc(item.id).delete();
        })
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
