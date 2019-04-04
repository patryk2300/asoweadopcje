import { Injectable } from '@angular/core';
import { Upload } from '../file-upload/upload';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore'; 1
import * as firebase from 'firebase';
import { NewsSchema } from '../news-upload/news-schema';


@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  storageRef: AngularFireStorageReference;

  task: AngularFireUploadTask;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {}

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

  saveFileData(upload: Upload, path: string){
    let obj = this.createFbObject();

    obj.dogName = upload.attach;
    obj.desc = upload.desc;

    return this.db.collection(path).doc(`${ upload.attach }`).set(obj);
  }

  saveNewsFile(news: NewsSchema, path: string){
    return this.db.collection(path).doc(news.title).set(news);
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
  
  saveMainMenuUrl(dogName: string, url: string, imgDesc: string){
    this.db.collection(this.baseMenuPath).doc(`${ dogName }`)
        .set({
            dogName: dogName,
            imgUrl: url, 
            imgDesc: imgDesc
          });
  }

  pushNews(news: NewsSchema, mainImg: File, images: FileList){
    
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