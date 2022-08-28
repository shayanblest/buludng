import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableColumnDirective } from './directives/datatable-column.directive';
import { DatatableLengthDirective } from './directives/datatable-length.directive';
import { DatatablePaginationDirective } from './directives/datatable-pagination.directive';
import { DatatableSearchDirective } from './directives/datatable-search.directive';
import { DatatableDirective } from './directives/datatable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DatatableColumnDirective,
    DatatableLengthDirective,
    DatatablePaginationDirective,
    DatatableSearchDirective,
    DatatableDirective
  ],
  exports: [
    DatatableColumnDirective,
    DatatableLengthDirective,
    DatatablePaginationDirective,
    DatatableSearchDirective,
    DatatableDirective
  ]
})
export class DatatableModule { }
