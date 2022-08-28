import { Directive, HostListener } from '@angular/core';
import { DatatableService } from '../services/datatable.service';

@Directive({
  selector: 'input[datatableSearch]'
})
export class DatatableSearchDirective {


  @HostListener('input', ['$event.target']) onInput(input: HTMLInputElement) {
    this.datatableService.search(input.value);
  }

  constructor(
    private datatableService: DatatableService
  ) { }

}
