import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective , FormArray} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { BooksService } from "../../books.service";
import { publishDateValidation } from "./datevalidate";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  authorNames: string[];
  filteredOptions: Observable<string[]>;
  createBookForm: FormGroup;

  constructor(private fb: FormBuilder,private _myservice: BooksService) {
    this.createBookForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      count: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // number only
      date: ['', [Validators.required, publishDateValidation]],//date picker
      author: ['', Validators.required], //dropdown
    });
   }

  ngOnInit(): void {
    this.filteredOptions = this.createBookForm.controls.author.valueChanges
    .pipe(
    startWith(''),
      map(value => this._filter(value))
    );

    this.authorNames =  this._myservice.getAuthorsData();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.authorNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  submit(){
    console.log(this.createBookForm.value);
    let tmp = {id: this.createBookForm.value.id , name: this.createBookForm.value.name, description: this.createBookForm.value.description, author: this.createBookForm.value.author, pagecount: this.createBookForm.value.count, date:this.createBookForm.value.date}
    this._myservice.addBooks(tmp).subscribe(
      data=>console.log(data)
    );
    this.createBookForm.reset();
  }

}
