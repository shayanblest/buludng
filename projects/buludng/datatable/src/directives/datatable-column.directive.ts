import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableRequest } from '../models/datatable-request.model';
import { DatatableService } from '../services/datatable.service';

@Directive({
  selector: 'th[datatableColumn]'
})

export class DatatableColumnDirective {

  @Input() datatableColumn?: string;

  readonly nativeElement?: HTMLTableCellElement;

  @HostListener('click') onClick() {
    if (this.datatableColumn) {
      this.datatable.sort(this.datatableColumn)
    }
  }

  constructor(
    private datatable: DatatableService,
    private elementRef: ElementRef
  ) {
    this.nativeElement = elementRef.nativeElement;
  }
}
