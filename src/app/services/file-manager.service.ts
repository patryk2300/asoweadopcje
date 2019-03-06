import { Injectable } from '@angular/core';
import { Upload } from '../file-upload/upload';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  storageRef: AngularFireStorageReference;

  task: AngularFireUploadTask;

  percentage: Observable<number>;

  snapshot: Observable<any>;

  downloadUrl: string;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {}

  private basePath: string = 'gallery';

  pushUpload(upload: Upload){

    this.task = this.storage.upload(`${ this.basePath }/${ upload.attach }/${upload.file.name}`, upload.file)

    this.storageRef = this.storage.ref(`${ this.basePath }/${ upload.attach }/${upload.file.name}`);

    this.percentage = this.task.percentageChanges();

    this.task.then(() => {
      this.storageRef.getDownloadURL()
        .subscribe(url => {
          upload.url = url;
          
          if(upload.mainFile){
            this.saveFileUrl(upload, true);

            upload.mainFile = null;
            return;
          } else this.saveFileUrl(upload, false);
        
        });
    });
  }

  saveFileData(upload: Upload){
    let obj = this.createFbObject();

    obj.dogName = upload.attach;
    obj.desc = upload.desc;

    return this.db.collection(this.basePath).doc(`${ upload.attach }`).set(obj);
  }

  saveFileUrl(upload: Upload, mainImg?: boolean){
    if(mainImg){
      this.db.collection(this.basePath).doc(`${ upload.attach }`)
        .update({
          mainImg: {
            downloadUrl: upload.url, 
            imgName: upload.name 
          }
      });

    } else {
      let uniqueData = {};
      uniqueData[`${upload.file.name}`] = { downloadUrl: upload.url, imgName: upload.name };

      this.db.collection(this.basePath).doc(`${ upload.attach }`).set({
        images: firebase.firestore.FieldValue.arrayUnion({ downloadUrl: upload.url, imgName: upload.name })
      }, {merge: true});
    }
  }

  getDoc(docName: string){
    return this.db.collection(this.basePath).doc(docName).get();
  }

  createFbObject(){
    return {
        desc: '',
        images : [],
        mainImg: {
          downloadUrl: '', 
          imgName: ''},
        dogName: ''
      }
    }
}