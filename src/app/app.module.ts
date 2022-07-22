import { DragDropComponent } from './_components/drag-drop/drag-drop.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GojsAngularModule } from 'gojs-angular';
import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';



@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    DragDropComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GojsAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
