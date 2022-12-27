import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[bngTemplate]'
})
export class BngTemplateDirective {

  @Input("bngTemplate") templateName: string = "";

  constructor(public templateRef: TemplateRef<unknown>) { }

}
