import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { DataTableOptions } from '../models/datatable-options';
import { DataTableRequest } from '../models/datatable-request.model';

@Directive({
  selector: 'table[bngDatatable]'
})
export class DatatableDirective {

  @Input() options?: DataTableOptions;

  @Output() onDatatableChange: EventEmitter<DataTableRequest> = new EventEmitter<DataTableRequest>();

  constructor() { }


  change(state: DataTableRequest): void {
    this.onDatatableChange.emit(state);
  }

}
