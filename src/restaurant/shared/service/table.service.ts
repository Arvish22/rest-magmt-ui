import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private firestore: AngularFirestore) { }

  createTables(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("tables")
        .add(data)
        .then(res => {
        }, err => reject(err));
    });
  }

  getTables() {
    return this.firestore.collection("tables").snapshotChanges();
  }

  updateTable(data: any) {
    return this.firestore
      .collection("tables")
      .doc("")
      .set({ completed: true }, { merge: true });
  }

  deleteTable(data: any) {
    return this.firestore
      .collection("tables")
      .doc(data)
      .delete();
  }
}
