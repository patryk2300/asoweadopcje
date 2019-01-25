import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileUpload } from '../common/file-upload';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private db: AngularFireDatabase) { }

  
  storageRef = firebase.storage().ref();

  getImage(filePath: string) {
    this.storageRef.child('/gallery/nachos.jpg').getDownloadURL().then((url) => {
      return url;
    });
  }
}
