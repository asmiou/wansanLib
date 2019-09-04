import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  registration(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            resolve();
          },
            (error) => {
              reject(error);
            });
      }
    )
  }

  login(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            resolve();
          },
            (error) => {
              reject(error);
            });
      }
    );
  }

  logout() {
    firebase.auth().signOut();
  }
}
