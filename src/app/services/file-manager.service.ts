import { Injectable } from '@angular/core';
import { Upload } from '../file-upload/upload';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore'; 1
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  storageRef: AngularFireStorageReference;

  task: AngularFireUploadTask;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {}

  private basePath: string = 'gallery';
  private baseMenuPath: string = 'main-menu';

  pushUpload(upload: Upload){

    this.task = this.storage.upload(`${ this.basePath }/${ upload.attach }/${upload.file.name}`, upload.file)

    this.task.then(() => {
      this.storage.ref(`${ this.basePath }/${ upload.attach }/${upload.file.name}`)
        .getDownloadURL()
        .subscribe(url => {
          upload.url = url;
          
          if(upload.mainFile){
            this.saveFileUrl(upload, true);

            upload.mainFile = null;
          } else this.saveFileUrl(upload, false);
        
        });
    });
  }

  pushUploadMainMenu(dogName: string, imgDesc: string, file: File){
    this.db.collection(this.basePath).doc(dogName).get()
        .subscribe(document => {
          if(document.exists){
            this.task = this.storage.upload(`${ this.baseMenuPath }/${ dogName }`, file);

            this.task.then(() => {
              this.storage.ref(`${ this.baseMenuPath }/${ dogName }`).getDownloadURL()
                .subscribe(url => {
                  this.saveMainMenuUrl(dogName, url, imgDesc);
                })
            })
          }
          else
            alert('Takiego psa nie ma w bazie ! (Spójrz w zakładkę Psiaki)');

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
  
  saveMainMenuUrl(dogName: string, url: string, imgDesc: string){
    this.db.collection(this.baseMenuPath).doc(`${ dogName }`)
        .set({
            dogName: dogName,
            imgUrl: url, 
            imgDesc: imgDesc
          });
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