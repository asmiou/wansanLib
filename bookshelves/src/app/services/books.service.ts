import { Injectable } from '@angular/core';
import Book from '../models/Book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() {
    this.getBooks();
  }

  books: Book[] = [];

  booksSubject = new Subject<Book[]>();

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books').on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value')
          .then(
            (data) => {
              resolve(data.val());
            }, (error) => {
              reject(error);
            }
          );
      }
    );
  }

  createNewBook(book: Book) {
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if (book.imageLink) {
      const storageRef = firebase.storage().refFromURL(book.imageLink);
      storageRef.delete().then(
        () => {
          console.log('Photo Supprimée!')
        }
      ).catch((error) => {
        console.log('Fichier non trouvé ' + error);
      });
    }
    const bookIndex = this.books.findIndex(
      (b) => {
        if (b === book) return true;
      }
    );

    this.books.splice(bookIndex, 1);
    this.saveBooks();
    this.emitBooks();
  }

  addAttribut() {
    let livres = [];
    firebase.database().ref('/books').on('value', (data) => {
      livres = data.val() ? data.val() : [];
      livres.map(l => {
        l.imageLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf1bOB6i9mT3Yu5cWbndXlYyDAysXpGylrF002kYWyWUeYWOjZLA";
      })
      console.log(livres);
      firebase.database().ref('/books').set(livres);
    });
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const uniqName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + uniqName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

}
