import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private firestore: AngularFirestore ) {}

  createOrder(data : any) {
       return this.firestore
            .collection("orders")
            .add(data);
}

getOrder() { 
  return  this.firestore.collection("orders").snapshotChanges();
}

updateOrder(data : any) {
  return this.firestore
      .collection("orders")
      .doc(data)
      .set({ completed: true }, { merge: true });
}

deleteOrder(data : any) {
  return this.firestore
      .collection("orders")
      .doc(data)
      .delete();
}
}
