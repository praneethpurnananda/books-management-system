import { Component, OnInit , ViewChild, Inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { BooksService } from "../../books.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
    displayedColumns: string[] = ['Bookid', 'Bookname', 'Description', 'Author', 'Pagecount', 'Publishdate', 'edit' , 'delete'];
    booksData;
    dataSource;


  constructor(private _myservice: BooksService,public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
    this._myservice.getBooksData()
    .subscribe(
      data=>
      {
        this.booksData = data,
        this.dataSource = new MatTableDataSource(this.booksData);
      }
    );


  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }

  edit(item){

  }

  delete(item){
    const dialogRef = this.dialog.open(DeleteData, {
    width:'900px',
    data: {id: item.id , name: item.name},
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result){
        this.ngOnInit();
      }
      });

      this.ngOnInit();
  }

}



//model box typescript file starts

@Component({
  selector: 'delete',
  templateUrl: 'delete.html',
  styleUrls: ['./display.component.css']
})
export class DeleteData {

  constructor(private _myservice: BooksService,
    public dialogRef: MatDialogRef<DeleteData>,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log(data);
    }
    onNoClick(): void {
    this.dialogRef.close();
  }

  flg = 0;

  delete(){
    this._myservice.deleteBook(this.data).subscribe();
  }

}
