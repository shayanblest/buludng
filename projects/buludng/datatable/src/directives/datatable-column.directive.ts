import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'th[datatableColumn]'
})

export class DatatableColumnDirective {

  @Input() datatableColumn?: string;

  constructor() {

  }
}
