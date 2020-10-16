import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective , FormArray} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { BooksService } from "../../books.service";
import { publishDateValidation } from "./datevalidate";
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  authorNames;
  filteredOptions: Observable<string[]>;
  createBookForm: FormGroup;
  booksData;
  editData;
  errmsg;

  constructor(private fb: FormBuilder,private _myservice: BooksService,private route: ActivatedRoute,private router: Router,private _snackBar: MatSnackBar) {
    this.createBookForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      count: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // number only
      date: ['', [Validators.required, publishDateValidation]],//date picker
      author: ['', Validators.required], //dropdown
    });
   }




   ngOnInit(): void {
    this._myservice.getAuthorsData()
    .subscribe(
      data => {
        this.authorNames = data,
        console.log(this.authorNames),
        this.filteredOptions = this.createBookForm.controls.author.valueChanges
        .pipe(
        startWith(''),
          map(value => this._filter(value))
        );
      },
      error => console.log(error)
    )

  }





  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.authorNames.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  submit(){
    let authName = this.createBookForm.value.author;
    if(this.authorNames.find(x => x.name.toLowerCase() == authName.toLowerCase()))
    {
      let tmp = {name: this.createBookForm.value.name, description: this.createBookForm.value.description, author: this.createBookForm.value.author, pagecount: this.createBookForm.value.count, date:this.createBookForm.value.date}
      this._myservice.addBooks(tmp).subscribe(
        data=>{
          console.log(data),
          this.openSnackBar('Successfully Added', 'close');
        },
        error => {
          console.log(error),
          this.openSnackBar('Something went wrong', 'close');
        }
      );
      this.createBookForm.reset();
      this.errmsg = "";
    }
    else
    {
      this.openSnackBar('Invalid author name', 'close');
      this.errmsg = "Invalid Author Name";
    };
  }

  openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 5000,
  });
}

}
