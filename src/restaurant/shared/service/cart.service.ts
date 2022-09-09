import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private firestore: AngularFirestore ) {}

  createOrder(data : any) {
    console.log("************8888",data);
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("orders")
            .add(data)
            .then(res => {
            }, err => {
              console.log("*****888");
              reject(err)});
    });
}

getOrder() { 
  return  this.firestore.collection("orders").snapshotChanges();
}

updateOrder(data : any) {
  return this.firestore
      .collection("orders")
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
}

deleteOrder(data : any) {
  return this.firestore
      .collection("orders")
      .doc(data)
      .delete();
}
}
