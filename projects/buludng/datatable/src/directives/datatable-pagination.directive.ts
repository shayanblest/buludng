import { AfterContentInit, ContentChildren, Directive, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { BngTemplateDirective } from './bng-template.directive';
import { DatatableWrapperDirective } from './datatable-wrapper.directive';

@Directive({
  selector: '[datatablePagination]'
})
export class DatatablePaginationDirective implements AfterContentInit, OnChanges {

  @ContentChildren(BngTemplateDirective) templateItems?: QueryList<BngTemplateDirective>;

  @Input() totalRecords: number = 0;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  private activePage: number = 1;
  private length: number = 10;

  private isReady: boolean = false;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngAfterContentInit(): void {

    const totalPages = this.getTotalPages(this.totalRecords, this.length);
    this.renderPagination(totalPages, this.activePage);
    this.isReady = true;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!this.isReady) return;

    const totalPages = this.getTotalPages(this.totalRecords, this.length);

    this.renderPagination(totalPages, this.activePage);
  }


  changeLength(pageLength: number): void {
    const totalPages = this.getTotalPages(this.totalRecords, pageLength);
    this.renderPagination(totalPages, 1);
  }

  changePage(pageNumber: number): void {
    this.activePage = pageNumber;
  }

  private getTotalPages(total: number, length: number): number {
    let res = total / length;
    return Math.ceil(res);
  }

  private renderPagination(totalPages: number, activePage: number) {
    const element = this.elementRef.nativeElement as HTMLUListElement;
    element.innerHTML = "";

    if (totalPages < 1) {
      return;
    }

    const prevItemDirective = this.templateItems?.find(x => x.templateName == 'prevItem');

    if (prevItemDirective) {
      const prevItem = prevItemDirective.templateRef.createEmbeddedView({});
      prevItem.detectChanges();
      const previus = prevItem.rootNodes[0] as HTMLLIElement;
      if (activePage <= 1)
        previus.classList.add('disabled');
      element.appendChild(previus);
      previus.addEventListener('click', (e) => {
        if (activePage > 1)
          this.pageChanged.emit(activePage - 1);
      })
    }

    const itemDirective = this.templateItems?.find(x => x.templateName == 'item');

    for (let index = 1; index <= totalPages; index++) {
      if (itemDirective) {
        const pItem = itemDirective.templateRef.createEmbeddedView({ $implicit: index })
        pItem.detectChanges();
        const item = pItem?.rootNodes[0] as HTMLLIElement;
        if (index == 1)
          item.classList.add("active");

        element.appendChild(item)
        item.addEventListener('click', () => {

          const paginationItems = element.querySelectorAll('li');

          paginationItems.forEach(x => x.classList.remove('active'));

          item.classList.add('active');
          this.pageChanged.emit(index);
        })
      }

    }

    const nextItemDirective = this.templateItems?.find(x => x.templateName == 'nextItem');

    if (nextItemDirective) {
      const nextItem = nextItemDirective.templateRef.createEmbeddedView({});
      nextItem.detectChanges();
      const next = nextItem.rootNodes[0] as HTMLLIElement;

      if (activePage >= totalPages)
        next.classList.add('disabled');

      element.appendChild(next);
      next.addEventListener('click', () => {

        if (activePage < totalPages)
          this.pageChanged.emit(activePage + 1);

      })
    }

    if (activePage > totalPages) {
      this.pageChanged.emit(totalPages)
    }
  }
}



