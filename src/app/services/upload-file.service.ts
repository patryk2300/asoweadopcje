import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private db: AngularFireDatabase) { }

  storageRef = firebase.storage().ref();

  getImage(filePath: string) {
    let url;
    this.storageRef.child('/gallery/nachos.jpg').getDownloadURL().then((downloadUrl) => {
      console.log(downloadUrl);
    });
    return url;
  }
}