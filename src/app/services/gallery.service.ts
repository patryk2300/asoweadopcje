import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  gallery$: Observable<any>;
  galleryRef: AngularFirestoreCollection;
  basePath: string = 'gallery/';
  current;
  
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
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

    removeCard(item, path: string){
      let mainImg;
      let imgs: Array<any>;
      this.getDoc(path, item.id)
        .get()
        .toPromise()
        .then(doc => {
          mainImg = doc.get('mainImg');
          imgs = doc.get('images');
        })
        .then(() => {
          this.storage.ref(path).child(`${item.id}/${mainImg.imgName}`)
            .delete();
          imgs.forEach(img => {
            this.storage.ref(path).child(`${item.id}/${img.imgName}`)
              .delete();
          });
        })
        .then(() => {
          this.db.collection(path).doc(item.id).delete();
        })
      }
    
    removeBanner(dog){
      const path: string = 'main-menu'

      this.storage.ref(`${path}/${dog.imgName}`)
        .delete()
        .toPromise()
        .then(() => {
          this.db.collection(path).doc(dog.dogName).delete();
        });
        
    }

    removeNews(news){
      const path: string = 'news';

      this.storage.ref(`${path}/${news.id}`)
        .delete()
        .toPromise()
        .then(() => {
          this.db.collection(path).doc(`${news.id}`).delete();
        });
    }

    updateName(item, name){
      let newItem = JSON.parse(JSON.stringify(item.name));
      newItem.name = name;
      
      this.galleryRef.doc(`${ item.id }`).update(newItem);
    }

    getDoc(path: string, docName: string){
      return this.db.collection(path).doc(docName);
    }

    findDogId(path: string, dogName: string){
      return firebase.firestore().collection(path)
        .where('dogName', '==', dogName)
        .get()
    }
}
