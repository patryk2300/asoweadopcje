import { Injectable } from '@angular/core';
import { Upload } from '../file-upload/upload';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  private basePath: string = 'gallery';

  pushUpload(upload: Upload, uniqKey: string){
    let storageRef = firebase.storage().ref();
    let imgRef = storageRef.child(`${ this.basePath }/${ upload.attach }/${upload.file.name}`);
    imgRef.put(upload.file)
    .then((snapshot) => {  
      return snapshot.ref.getDownloadURL();
    })
    
    .then((downloadUrl) => {
      upload.url = downloadUrl;
      this.saveFileData(upload);
    })
    
    .catch((error) => console.log(error));
  }

  saveFileData(upload: Upload){
    let obj = this.createFbObject();
    obj.mainImg = upload.url;
    obj.name = upload.attach;
    this.db.doc(`${ this.basePath }/${ upload.attach }/`).set(obj);
  }

  createFbObject(){
    return {
        desc: '',
        images : [],
        mainImg: '',
        name: ''
      }
    }
}