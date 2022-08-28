import { AfterContentInit, AfterViewInit, ContentChild, Directive, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableRequest } from '../models/datatable-request.model';
import { DatatableService } from '../services/datatable.service';

@Directive({
  selector: 'ul[datatablePagination]'
})
export class DatatablePaginationDirective implements AfterContentInit, OnDestroy {

  @ContentChild("prevButton") prevButton?: TemplateRef<any>;
  @ContentChild("paginationItem") paginationItem?: TemplateRef<any>;
  @ContentChild("nextButton") nextButton?: TemplateRef<any>;

  pagionationItems: HTMLLIElement[] = [];


  subscription?: Subscription;

  constructor(
    private datatable: DatatableService,
    private elementRef: ElementRef
  ) { }

  ngAfterContentInit(): void {

    this.subscription = this.datatable.getDataTableRequest().subscribe((res: DataTableRequest) => {

      const element = this.elementRef.nativeElement as HTMLUListElement;
      element.innerHTML = "";

      const totalPages = this.datatable.getTotalPages();

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
        if (res.page == index)
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

      if (res.page > totalPages) {
        this.datatable.changePage(totalPages)
      }
    })

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}



