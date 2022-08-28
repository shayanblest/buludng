import { AfterContentInit, AfterViewInit, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataTableOptions } from '../models/datatable-options';
import { DataTableRequest } from '../models/datatable-request.model';
import { DatatableService } from '../services/datatable.service';
import { DatatableColumnDirective } from './datatable-column.directive';

@Directive({
  selector: '[datatable]'
})
export class DatatableDirective implements AfterContentInit, OnDestroy {

  @Input() options?: DataTableOptions;

  @Output() onDatatableChange: EventEmitter<DataTableRequest> = new EventEmitter<DataTableRequest>();

  @ContentChildren(DatatableColumnDirective, { descendants: true }) columns!: QueryList<DatatableColumnDirective>;

  private subscription?: Subscription;

  constructor(
    private dtService: DatatableService,
  ) { }

  ngAfterContentInit(): void {


    this.subscription = this.dtService.getDataTableRequest().subscribe((req: DataTableRequest) => {

      if (req.sortColumn) {
        this.columns.forEach(x => {
          x.nativeElement?.classList.remove('asc', 'desc');
        })
  
        const col = this.columns.find(x => x.datatableColumn == req.sortColumn?.name);
        if (col) {
          col.nativeElement?.classList.add(req.sortColumn.sortDir);
        }
      }

      this.onDatatableChange.emit(req);
    })

    this.dtService.initDatatable(this.options);

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
