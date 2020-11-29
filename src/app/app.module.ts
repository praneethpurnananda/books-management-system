import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//MODULES
import { DashboardModule } from "./dashboard/dashboard.module";
import { BooksModule } from "./books/books.module";

//components
import { NavbarComponent } from './navbar/navbar.component';

//NG MATERIAL
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { DemoComponent } from './demo/demo.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    BooksModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
