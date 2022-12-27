import { AfterContentInit, AfterViewInit, ContentChild, Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableRequest } from '../models/datatable-request.model';
import { DatatableService } from '../services/datatable.service';

@Directive({
  selector: 'ul[datatablePagination]'
})
export class DatatablePaginationDirective implements OnChanges {

  @ContentChild("prevButton") prevButton?: TemplateRef<any>;
  @ContentChild("paginationItem") paginationItem?: TemplateRef<any>;
  @ContentChild("nextButton") nextButton?: TemplateRef<any>;

  pagionationItems: HTMLLIElement[] = [];

  @Input() totalRecords: number = 0;

  subscription?: Subscription;

  constructor(
    private datatable: DatatableService,
    private elementRef: ElementRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const totalPages = this.getTotalPages(this.totalRecords);
    setTimeout(() => {
      this.renderPagination(totalPages);
    }, 100);
  }

  private getTotalPages(length: number): number {
    let mod = this.totalRecords % length;
    if (mod != 0)
      return (this.totalRecords / length) + 1;
    else
      return this.totalRecords / length;
  }

  private renderPagination(totalPages: number) {
    const element = this.elementRef.nativeElement as HTMLUListElement;
    element.innerHTML = "";

    if (totalPages < 1) {
      return;
    }
    if (this.prevButton) {
      const prevItem = this.prevButton.createEmbeddedView({});
      prevItem.detectChanges();
      const previus = prevItem.rootNodes[0] as HTMLLIElement;
      if (this.datatable.page <= 1)
        previus.classList.add('disabled');
      element.appendChild(previus);
      previus.addEventListener('click', () => {
        if (this.datatable.page > 1)
          this.datatable.changePage(this.datatable.page - 1);
      })
    }

    for (let index = 1; index <= totalPages; index++) {
      const pItem = this.paginationItem?.createEmbeddedView({ pageNumber: index })
      pItem?.detectChanges();
      const item = pItem?.rootNodes[0] as HTMLLIElement;
      if (this.datatable.page == index)
        item.classList.add("active");

      element.appendChild(item)
      item.addEventListener('click', () => {
        this.datatable.changePage(index);
      })
    }


    if (this.nextButton) {
      const nextItem = this.nextButton?.createEmbeddedView({});
      nextItem.detectChanges();
      const next = nextItem.rootNodes[0] as HTMLLIElement;

      if (this.datatable.page >= totalPages)
        next.classList.add('disabled');

      element.appendChild(next);
      next.addEventListener('click', () => {

        if (this.datatable.page < totalPages)
          this.datatable.changePage(this.datatable.page + 1);

      })
    }

    if (this.datatable.page > totalPages) {
      this.datatable.changePage(totalPages)
    }
  }
}



