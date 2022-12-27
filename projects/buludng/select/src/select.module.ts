import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BngSelectComponent } from './components/bng-select/bng-select.component';
import { BngTemplateDirective } from './directives/bng-template.directive';

@NgModule({
  declarations: [
    BngSelectComponent,
    BngTemplateDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BngSelectComponent,
    BngTemplateDirective
  ]
})
export class SelectModule { }
