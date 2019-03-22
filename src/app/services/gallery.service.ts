import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileManagerService } from './file-manager.service';
import { map } from 'rxjs/operators';

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
    this.gallery$ = this.get(this.basePath);
  }

    get(path: string){
      return this.db.collection(path)
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

    removeCard(item){
      let mainImg;
      let imgs: Array<any>;

      this.getDoc(item.id)
        .get()
        .toPromise()
        .then(doc => {
          mainImg = doc.get('mainImg');
          imgs = doc.get('images');
        })
        .then(() => {
          this.storage.ref(this.basePath).child(`${item.id}/${mainImg.imgName}`)
            .delete();
          imgs.forEach(img => {
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

    getDoc(docName: string){
      return this.db.collection(this.basePath).doc(docName);
    }
}
