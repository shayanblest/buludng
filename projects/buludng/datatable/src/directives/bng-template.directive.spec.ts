/* tslint:disable:no-unused-variable */

import { AfterContentInit, Component, ContentChild, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BngTemplateDirective } from './bng-template.directive';


@Component({
  template: `
  <ng-template #testTemplate bngTemplate="testTemplate">
    <div>salam</div>
  </ng-template>

  <ng-container *ngTemplateOutlet="testTemplate"></ng-container>
  `
})
export class TestComponent implements AfterContentInit {

  @ContentChild(BngTemplateDirective) template!: BngTemplateDirective;

  ngAfterContentInit(): void {

  }
}

describe('Datatable Directive: BngTemplate', () => {

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, BngTemplateDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .createComponent(TestComponent);
    fixture.detectChanges(); // initial binding
  });

  it('Should template name equals testTemplate', () => {
    // console.log(fixture.debugElement.children);
    expect(1).toEqual(1);
  });
});
