import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from "@angular/forms";
import { DisplayComponent,DeleteData } from './display/display.component';

import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [DisplayComponent,DeleteData],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    DisplayComponent,
  ]
})
export class DashboardModule { }
