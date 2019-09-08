import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Router, ActivatedRoute } from '@angular/router';
import Book from 'src/app/models/Book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  book: Book;

  getBook(id: number) {

    this.booksService.getSingleBook(id)
      .then(
        (b: Book) => {
          this.book = b;
          //console.log(this.book);
        }
      ).catch(
        (error) => {
          console.log("Error de chargement" + error)
        }
      );
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id !== null) {
      this.getBook(id);
    }
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ['', Validators.required],
      country: "",
      language: "",
      link: "",
      pages: "",
      year: "",
    });
  }

  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;
    const book = new Book(title, author, synopsis);
    (this.bookForm.get('country').value) ? book.country = this.bookForm.get('country').value : null;
    (this.bookForm.get('language').value) ? book.language = this.bookForm.get('language').value : null;
    (this.bookForm.get('link').value) ? book.link = this.bookForm.get('link').value : null;
    (this.bookForm.get('pages').value) ? book.pages = this.bookForm.get('pages').value : null;
    (this.bookForm.get('year').value) ? book.year = this.bookForm.get('year').value : null;


    if (this.fileUrl && this.fileUrl !== '') {
      book.imageLink = this.fileUrl;
    }

    this.booksService.createNewBook(book);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  backToLink() {
    this.router.navigate(['/books'])
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files['0']);
  }

}
