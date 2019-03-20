import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  basePath: string = 'events';

  months: Array<number> = new Array(12);

  constructor(private fireDb: AngularFirestore) { }

  getEvents(year: number, month: number){
    return this.fireDb.collection(this.basePath)
        .doc(`${year}`)
        .collection(`${month}`)
        .valueChanges();
        // .snapshotChanges()
        // .pipe(
        //   map((actions) => {
        //     return actions.map(a => {
              
        //       const data = a.payload.doc.data();
        //       const id = a.payload.doc.id;
              
        //       return { id, ...data};
        //     });
        // }));
  }

  pushEvent(item, year, month, day){

    return this.fireDb.collection(`${ this.basePath }`).doc(`${year}/${month}/${day}`).set(item, {merge: true});
  }

}