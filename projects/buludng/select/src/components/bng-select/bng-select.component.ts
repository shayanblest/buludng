import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BngTemplateDirective } from '../../directives/bng-template.directive';
@Component({
  selector: 'bng-select',
  templateUrl: './bng-select.component.html',
  styleUrls: ['./bng-select.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BngSelectComponent implements AfterContentInit {

  constructor(
    private ref: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>
  ) { }

  @Input() placeHolder?: string;

  @Input() class?: string;

  @Input() popUpClass?: string;

  @Input() searchInputClass?: string;
  @Input() searchInputPlaceHolder?: string;

  @ContentChildren(BngTemplateDirective) templates!: QueryList<BngTemplateDirective>;

  @Input() options?: any;

  @Output() search = new EventEmitter<string>();

  selectedItemTemplate?: BngTemplateDirective;
  itemTemplate?: BngTemplateDirective;
  inputTemplate?: BngTemplateDirective;

  selectedItem: any = undefined;

  isOpen: boolean = false;

  ngAfterContentInit(): void {
    this.elementRef.nativeElement.classList.value = "";
    this.selectedItemTemplate = this.templates.find(x => x.templateName == "selectedItem");
    this.itemTemplate = this.templates.find(x => x.templateName == "item");
    this.inputTemplate = this.templates.find(x => x.templateName == "input");
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    // this.ref.detectChanges();
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.isOpen = false;
    // this.ref.detectChanges();
  }

  removeSelected() {
    this.selectedItem = undefined;
    // this.ref.detectChanges();
  }

  searchOptions(e: any) {
    const target = e.target as HTMLInputElement;
    this.search.emit(target.value);
  }

}
