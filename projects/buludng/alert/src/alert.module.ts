import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BngAlertComponent } from './components/bng-alert/bng-alert.component';

@NgModule({
  declarations: [
    BngAlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BngAlertComponent
  ]
})
export class AlertModule { }
