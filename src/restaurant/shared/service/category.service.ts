import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../modal/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private firestore: AngularFirestore ) {}

  createCategory(data : Category) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("categories")
            .add(data)
            .then(res => {
            }, err => reject(err));
    });
}

getCategory() { 
  return  this.firestore.collection("categories").snapshotChanges();
}

updateCategory(data : any) {
  return this.firestore
      .collection("categories")
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
}

deleteCategory(data : any) {
  return this.firestore
      .collection("categories")
      .doc(data)
      .delete();
}
}
