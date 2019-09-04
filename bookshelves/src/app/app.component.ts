import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bibliothèque - Wansan';
  constructor() {
    this.initFirebase();
  }

  initFirebase() {
    let firebaseConfig = {
      apiKey: "AIzaSyCwJhN8pnm1FaIJRkZnkphcIvpZuTahxCM",
      authDomain: "bibliotheque-2fcb7.firebaseapp.com",
      databaseURL: "https://bibliotheque-2fcb7.firebaseio.com",
      projectId: "bibliotheque-2fcb7",
      storageBucket: "",
      messagingSenderId: "952507850772",
      appId: "1:952507850772:web:965c5c4c903ba835"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
