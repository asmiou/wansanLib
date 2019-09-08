import { Component, OnInit, OnDestroy } from '@angular/core';
import Book from '../models/Book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  constructor(private booksService: BooksService, private router: Router) { }

  search: string;

  books: Book[];

  booksSubscription: Subscription;

  ngOnInit() {
    //this.booksService.addAttribut();
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (b: Book[]) => {
        this.books = b;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    if (confirm("Etes vous sure de vouloir supprimer ce livre?")) {
      this.booksService.removeBook(book);
    }
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }


  onChangeSearch() {
    if (this.search != "") {
      let s = this.search.toLocaleLowerCase();
      this.books = this.books.filter(
        b => {
          return b.title.toLocaleLowerCase().includes(s);
        }
      );
    } else {
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
