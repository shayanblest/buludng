/* tslint:disable:no-unused-variable */

import { AfterContentInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DatatableColumnDirective } from './datatable-column.directive';

@Component({
  template: `

<table>
  <thead>
    <tr>
      <th datatableColumn="test"></th>
    </tr>
  </thead>
</table>

  `
})
export class TestComponent implements AfterContentInit {

  ngAfterContentInit(): void {

  }
}

describe('Directive: DatatableColumn', () => {

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let des: any;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, DatatableColumnDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .createComponent(TestComponent);
    fixture.detectChanges(); // initial binding
    des = fixture.debugElement.queryAll(By.directive(DatatableColumnDirective));
  });

  it('should have one column directive', () => {
    expect(des.length).toBe(1)
  });

  it('should column name equals test', () => {

    const dir = des[0].injector.get(DatatableColumnDirective) as DatatableColumnDirective;

    const name = dir.datatableColumn;

    // const columnName = de

    expect(name).toBe("test")
  });

});
