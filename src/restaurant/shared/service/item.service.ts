import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from '../modal/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private firestore: AngularFirestore) { }

  createItems(data: Item) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("items")
        .add(data)
        .then(res => {
        }, err => reject(err));
    });
  }

  getItems() {
    return this.firestore.collection("items").snapshotChanges();
  }

  updateItem(data: Item) {
    return this.firestore
      .collection("items")
      .doc("")
      .set({ completed: true }, { merge: true });
  }

  deleteItem(data: any) {
    return this.firestore
      .collection("items")
      .doc(data)
      .delete();
  }
}
