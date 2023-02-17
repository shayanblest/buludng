import { AfterContentInit, ContentChild, ContentChildren, Directive, ElementRef, OnDestroy, QueryList } from '@angular/core';

import { DataTableRequest } from '../models/datatable-request.model';
import { DatatableColumnDirective } from './datatable-column.directive';
import { DatatableLengthDirective } from './datatable-length.directive';
import { DatatableSearchDirective } from './datatable-search.directive';
import { DatatablePaginationDirective } from './datatable-pagination.directive';
import { DatatableDirective } from './datatable.directive';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[bngDatatableWrapper]'
})
export class DatatableWrapperDirective implements AfterContentInit, OnDestroy {

  @ContentChild(DatatableDirective,
    { descendants: true, read: DatatableDirective }) datatable!: DatatableDirective;

  @ContentChildren(DatatableColumnDirective,
    { descendants: true, read: ElementRef }) columns!: QueryList<ElementRef<HTMLTableCellElement>>;

  @ContentChild(DatatableLengthDirective,
    { descendants: true, read: ElementRef }) length!: ElementRef<HTMLSelectElement>;

  @ContentChild(DatatableSearchDirective,
    { descendants: true, read: ElementRef }) searchInput!: ElementRef<HTMLInputElement>;

  @ContentChild(DatatablePaginationDirective,
    { descendants: true, read: DatatablePaginationDirective }) pagination!: DatatablePaginationDirective;

  state: DataTableRequest = {
    length: 10,
    page: 1
  }

  private subscriptions: Subscription[] = [];

  constructor() { }


  ngAfterContentInit(): void {

    this.initDatable();

  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  sort(columnName: string): void {
    if (!this.state.sortColumn) {
      this.state.sortColumn = {
        name: columnName,
        sortDir: 'desc'
      }
    }
    else {
      if (this.state.sortColumn.name == columnName) {
        if (this.state.sortColumn.sortDir == 'asc') {
          this.state.sortColumn.sortDir = 'desc';
        }
        else {
          this.state.sortColumn.sortDir = 'asc';
        }
      }
      else {
        this.state.sortColumn = {
          name: columnName,
          sortDir: 'desc'
        }
      }
    }

    this.datatable.change(this.state);

  }

  changeLength(length: number): void {
    this.state.length = length;
    this.state.page = 1;
    this.pagination.changeLength(length);
    this.datatable.change(this.state);
  }

  search(searchValue: string): void {
    this.state.searchValue = searchValue;
    this.datatable.change(this.state);
  }

  changePage(pageNumber: number) {
    this.state.page = pageNumber;
    this.pagination.changePage(pageNumber);
    this.datatable.change(this.state);
  }

  initDatable() {
    this.addEventToColumns();
    this.addEventToLength();
    this.addEventToSearch();
    this.addEventListenerToPagination();
  }

  private addEventToColumns(): void {
    this.columns.forEach(col => {
      const colName = col.nativeElement.getAttribute('datatablecolumn');
      if (colName) {
        col.nativeElement.addEventListener('click', () => {

          this.columns.forEach(c => {
            c.nativeElement.classList.remove('asc', 'desc');
          });

          this.sort(colName);

          if (this.state.sortColumn) {
            col.nativeElement.classList.add(this.state.sortColumn.sortDir);
          }
        });
      }
    })
  }

  private addEventToLength(): void {
    this.length.nativeElement.addEventListener('change', () => {
      this.changeLength(parseInt(this.length.nativeElement.value));
    });
  }

  private addEventToSearch(): void {
    this.searchInput.nativeElement.addEventListener('input', () => {
      this.search(this.searchInput.nativeElement.value);
    })
  }

  private addEventListenerToPagination(): void {

    const sub = this.pagination.pageChanged.subscribe((pageNumber: number) => {
      this.changePage(pageNumber);
    });

    this.subscriptions.push(sub);
  }

}
