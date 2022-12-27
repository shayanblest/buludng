import { Injectable } from '@angular/core';
import { DataTableColumn, DataTableRequest, SortDirection } from '../models/datatable-request.model';
import { HttpParams } from '@angular/common/http';
import { DataTableOptions } from '../models/datatable-options';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  private column?: DataTableColumn;

  private searchValue?: string;

  private $dataTableRequest: Subject<DataTableRequest> = new Subject<DataTableRequest>();

  private dataTableRequest?: DataTableRequest;

  private options?: DataTableOptions;

  page: number = 1;

  private length: number = 10;



  initDatatable(opt?: DataTableOptions) {
    if (opt) {
      this.options = opt;
    }

    setTimeout(() => {
      if (opt?.showInUrl) {
        const qParams = this.route.snapshot.queryParams;
        if (Object.keys(qParams).length > 0) {
          this.page = qParams['page'] ? parseInt(qParams['page']) : this.page;
          this.length = qParams['length'] ? parseInt(qParams['length']) : this.length;
          this.searchValue = qParams['searchValue'] ? qParams['searchValue'] : this.searchValue;
          this.column = qParams['sortColumnName'] ? { name: qParams['sortColumnName'], sortDir: qParams['sortDir'] } : undefined;
        }
        this.getData();
      }
      else {
        this.getData();
      }
    }, 200);

  }


  search(searchVal: string) {
    this.searchValue = searchVal;
    if (this.options?.showInUrl) {
      this.navigate();
      this.getData();
    }
    else
      this.getData();

  }

  sort(colName: string) {
    if (!this.column) {
      this.column = {
        name: colName,
        sortDir: 'desc'
      }
    }
    else {
      if (this.column.name == colName) {
        if (this.column.sortDir == 'asc') {
          this.column.sortDir = 'desc';
        }
        else {
          this.column.sortDir = 'asc';
        }
      }
      else {
        this.column = {
          name: colName,
          sortDir: 'desc'
        }
      }
    }
    if (this.options?.showInUrl) {
      this.navigate();
      this.getData();
    }
    else
      this.getData();
  }

  changeLength(length: number) {
    this.length = length;
    if (this.options?.showInUrl) {
      this.navigate();
      this.getData();
    }
    else
      this.getData();
  }

  changePage(page: number) {
    this.page = page;
    if (this.options?.showInUrl) {
      this.navigate();
      this.getData();
    }
    else
      this.getData();

  }

  getDataTableRequest(): Observable<DataTableRequest> {
    return this.$dataTableRequest.asObservable();
  }

  private getData() {

    this.dataTableRequest = {
      page: this.page,
      length: this.length,
      searchValue: this.searchValue || '',
      sortColumn: this.column
    }


    this.$dataTableRequest.next(this.dataTableRequest);

    // this.navigate();
  }

  private navigate() {
    if (this.options?.showInUrl) {
      this.router.navigate([], {
        relativeTo: this.route,

        queryParams: {
          page: this.page != 1 ? this.page : null,
          length: this.length != 10 ? this.length : null,
          searchValue: this.searchValue != '' ? this.searchValue : null,
          sortColumnName: this.column?.name,
          sortDir: this.column?.sortDir
        },
        queryParamsHandling: 'merge'
      });
    }
  }
}

