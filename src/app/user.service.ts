import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { User } from './Models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:AngularFirestore) {
   }
getusers() {
    return this.fb.collection('users').snapshotChanges();
}
createuser(user: User){
  return this.fb.collection('users').doc().set(Object.assign({}, user));
}
}

