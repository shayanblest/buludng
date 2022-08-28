import { AfterContentInit, Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableRequest } from '../models/datatable-request.model';
import { DatatableService } from '../services/datatable.service';

@Directive({
  selector: '[datatableLength]'
})
export class DatatableLengthDirective implements OnInit, OnDestroy {

  @HostListener('change', ['$event.target']) onInput(select: HTMLSelectElement) {
    this.datatable.changeLength(parseInt(select.value));
  }

  private subscription?: Subscription;

  constructor(
    private datatable: DatatableService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    const element = this.elementRef.nativeElement as HTMLSelectElement;
    this.subscription = this.datatable.getDataTableRequest().subscribe((res: DataTableRequest) => {
      element.value = res.length.toString();
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
