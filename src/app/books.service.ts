import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksData = [];
  private authorsData: string[] = ['Shive Khera', 'arper Lee', 'Leo Tolstoy', 'F. Scott Fitzgeralds', 'Gabriel García Márquez', 'E.M. Forster'];

  constructor() { }

  getBooksData(){
    return this.booksData;
  }

  getAuthorsData(){
    return this.authorsData;
  }

  addBooks(tmp){
    this.booksData.push(tmp)
  }

  deleteBook(tmp){
    this.booksData = this.booksData.filter(({id}) => id !== tmp.id);
  }
}
