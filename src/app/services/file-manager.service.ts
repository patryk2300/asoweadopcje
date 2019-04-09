import { Injectable } from '@angular/core';
import { Upload } from '../file-upload/upload';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { NewsSchema } from '../news-upload/news-schema';
import { GalleryService } from './gallery.service';


@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  storageRef: AngularFireStorageReference;

  task: AngularFireUploadTask;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private galleryService: GalleryService) {}

  private basePath: string = 'gallery';
  private baseMenuPath: string = 'main-menu';
  
  pushUpload(upload: Upload, path: string, news?: NewsSchema){

    this.task = this.storage.upload(`${path}/${upload.attach}/${upload.file.name}`, upload.file)

    this.storage.ref(`${path}/${upload.attach}/${upload.file.name}`).put(upload.file)
      .then((result) => {
        this.storage.ref(`${path}/${upload.attach}/${upload.file.name}`)
            .getDownloadURL()
            .subscribe(url => {
              console.log(url);
              upload.url = url;

              if(upload.mainFile){
                this.saveFileUrl(upload, path, true);

                upload.mainFile = null;
              } else this.saveFileUrl(upload, path, false);

            })
      })
  }

  pushUploadMainMenu(dogName: string, imgDesc: string, file: File){

    firebase.firestore().collection('gallery') 
      .where('dogName', '==', dogName)
      .get()
      .then(value => {
        if(value.docs.shift()){
          this.task = this.storage.upload(`${ this.baseMenuPath }/${ dogName }`, file);

          this.task.then(() => {
            this.storage.ref(`${ this.baseMenuPath }/${ dogName }`).getDownloadURL()
              .subscribe(url => {
                this.saveMainMenuUrl(dogName, url, imgDesc, file.name);
              })
          })
        }
        else
          alert('Takiego psa nie ma w bazie ! (Spójrz w zakładkę Psiaki)');
      });
  }

  pushData(item: Object, path: string, id: any){
    return this.db.collection(path).doc(`${id}`).set(item);
  }

  saveFileUrl(upload: Upload, path: string, mainImg?: boolean){
    if(mainImg){
      console.log(upload);
      this.db.collection(path).doc(`${ upload.attach }`)
        .update({
          mainImg: {
            downloadUrl: upload.url, 
            imgName: upload.name
          }
      });

    } else {
      let uniqueData = {};
      uniqueData[`${upload.file.name}`] = { downloadUrl: upload.url, imgName: upload.name };

      

      this.db.collection(path).doc(`${ upload.attach }`).set({
        images: firebase.firestore.FieldValue.arrayUnion({ downloadUrl: upload.url, imgName: upload.name })
      }, {merge: true});
    }
  }
  
  saveMainMenuUrl(dogName: string, url: string, imgDesc: string, file_name: string){
    this.db.collection(this.baseMenuPath).doc(`${ dogName }`)
        .set({
            dogName: dogName,
            imgUrl: url,
            imgName: file_name,
            imgDesc: imgDesc
          });
  }
}