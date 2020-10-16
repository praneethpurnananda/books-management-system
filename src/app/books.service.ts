import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  // private booksData = [];
  // private authorsData: string[] = ['Shive Khera', 'arper Lee', 'Leo Tolstoy', 'F. Scott Fitzgeralds', 'Gabriel García Márquez', 'E.M. Forster'];

  constructor(private http:HttpClient) { }

  getBooksData(){
    return this.http.get('http://127.0.0.1:5000')
  }



  getAuthorsData(){
    return this.http.get('http://127.0.0.1:5000/authors');
  }

  addBooks(tmp){
    return this.http.post('http://127.0.0.1:5000/add',tmp);
  }

  deleteBook(tmp){
    return this.http.post('http://127.0.0.1:5000/delete',tmp);
  }


}
