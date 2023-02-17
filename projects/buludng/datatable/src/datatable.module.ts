import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableColumnDirective } from './directives/datatable-column.directive';
import { DatatableLengthDirective } from './directives/datatable-length.directive';
import { DatatablePaginationDirective } from './directives/datatable-pagination.directive';
import { DatatableSearchDirective } from './directives/datatable-search.directive';
import { DatatableDirective } from './directives/datatable.directive';
import { DatatableWrapperDirective } from './directives/datatable-wrapper.directive';
import { BngTemplateDirective } from './directives/bng-template.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DatatableColumnDirective,
    DatatableLengthDirective,
    DatatablePaginationDirective,
    DatatableSearchDirective,
    DatatableDirective,
    DatatableWrapperDirective,
    BngTemplateDirective
  ],
  exports: [
    DatatableColumnDirective,
    DatatableLengthDirective,
    DatatablePaginationDirective,
    DatatableSearchDirective,
    DatatableDirective,
    DatatableWrapperDirective,
    BngTemplateDirective
  ]
})
export class DatatableModule { }
