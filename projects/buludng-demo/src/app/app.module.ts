import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatatableModule } from 'projects/buludng/datatable';
import { AlertModule } from 'projects/buludng/alert';
import { ModalModule } from 'projects/buludng/modal';
import { SelectModule } from 'projects/buludng/select';
import { HttpClientModule } from '@angular/common/http';
import { DemoDatatableComponent } from './components/demo-datatable/demo-datatable.component';


@NgModule({
  declarations: [
    AppComponent,
    DemoDatatableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DatatableModule,
    AlertModule,
    ModalModule,
    ReactiveFormsModule,
    SelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
