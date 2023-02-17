import { AfterContentInit, ContentChildren, Directive, ElementRef, Input, OnChanges, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { BngTemplateDirective } from './bng-template.directive';
import { DatatableWrapperDirective } from './datatable-wrapper.directive';

@Directive({
  selector: '[datatablePagination]'
})
export class DatatablePaginationDirective implements AfterContentInit, OnChanges {

  @ContentChildren(BngTemplateDirective) templateItems?: QueryList<BngTemplateDirective>;

  @Input() totalRecords: number = 0;

  private isReady: boolean = false;

  constructor(
    private dtWrapper: DatatableWrapperDirective,
    private elementRef: ElementRef
  ) { }

  ngAfterContentInit(): void {

    const totalPages = this.getTotalPages(this.totalRecords, this.dtWrapper.state.length);
    this.renderPagination(totalPages);
    this.isReady = true;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!this.isReady) return;

    const totalPages = this.getTotalPages(this.totalRecords, this.dtWrapper.state.length);

    this.renderPagination(totalPages);
  }

  private getTotalPages(total: number, length: number): number {
    let mod = total % length;
    if (mod != 0)
      return (total / length) + 1;
    else
      return total / length;
  }

  private renderPagination(totalPages: number) {
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
      if (this.dtWrapper.state.page <= 1)
        previus.classList.add('disabled');
      element.appendChild(previus);
      previus.addEventListener('click', (e) => {
        if (this.dtWrapper.state.page > 1)
          this.dtWrapper.changePage(this.dtWrapper.state.page - 1);
      })
    }

    const itemDirective = this.templateItems?.find(x => x.templateName == 'item');

    for (let index = 1; index <= totalPages; index++) {
      if (itemDirective) {
        const pItem = itemDirective.templateRef.createEmbeddedView({ $implicit: index })
        pItem?.detectChanges();
        const item = pItem?.rootNodes[0] as HTMLLIElement;
        if (index == 1)
          item.classList.add("active");

        element.appendChild(item)
        item.addEventListener('click', () => {

          const paginationItems = element.querySelectorAll('li');

          paginationItems.forEach(x => x.classList.remove('active'));

          item.classList.add('active');
          this.dtWrapper.changePage(index);
        })
      }

    }

    const nextItemDirective = this.templateItems?.find(x => x.templateName == 'nextItem');

    if (nextItemDirective) {
      const nextItem = nextItemDirective.templateRef.createEmbeddedView({});
      nextItem.detectChanges();
      const next = nextItem.rootNodes[0] as HTMLLIElement;

      if (this.dtWrapper.state.page >= totalPages)
        next.classList.add('disabled');

      element.appendChild(next);
      next.addEventListener('click', () => {

        if (this.dtWrapper.state.page < totalPages)
          this.dtWrapper.changePage(this.dtWrapper.state.page + 1);

      })
    }

    if (this.dtWrapper.state.page > totalPages) {
      this.dtWrapper.changePage(totalPages)
    }
  }
}



