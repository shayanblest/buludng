/* tslint:disable:no-unused-variable */

import { AfterContentInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DatatableLengthDirective } from './datatable-length.directive';
import { DatatablePaginationDirective } from './datatable-pagination.directive';
import { DatatableSearchDirective } from './datatable-search.directive';
import { DatatableWrapperDirective } from './datatable-wrapper.directive';
import { DatatableDirective } from './datatable.directive';

@Component({
  template: `
    <div bngDatatableWrapper>
      <select datatableLength></select>
      <input type="text" datatableSearch>
      <ul datatablePagination></ul>
      <table bngDatatable></table>
    </div>
  `
})
export class TestComponent {
}

describe('Directive: DatatableWrapper', () => {

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let des: any;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        DatatableWrapperDirective,
        DatatableLengthDirective,
        DatatableSearchDirective,
        DatatablePaginationDirective,
        DatatableDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .createComponent(TestComponent);
    fixture.detectChanges(); // initial binding

    des = fixture.debugElement.queryAll(By.directive(DatatableWrapperDirective));
  });



  it('should set sort column as test:desc', () => {

    const directive = des[0].injector.get(DatatableWrapperDirective) as DatatableWrapperDirective;

    directive.state = {
      length: 10,
      page: 1
    }

    directive.sort('test');

    expect(directive.state.sortColumn?.name).toEqual("test");
    expect(directive.state.sortColumn?.sortDir).toEqual('desc');

  });

  it('should set sort column as test:asc', () => {

    const directive = des[0].injector.get(DatatableWrapperDirective) as DatatableWrapperDirective;

    directive.state = {
      length: 10,
      page: 1,
      sortColumn: {
        name: 'test',
        sortDir: 'desc'
      }
    }

    directive.sort('test');

    expect(directive.state.sortColumn?.name).toEqual("test");
    expect(directive.state.sortColumn?.sortDir).toEqual('asc');

  });

  it('should set sort column as test:desc', () => {

    const directive = des[0].injector.get(DatatableWrapperDirective) as DatatableWrapperDirective;

    directive.state = {
      length: 10,
      page: 1,
      sortColumn: {
        name: 'test',
        sortDir: 'asc'
      }
    }

    directive.sort('test');

    expect(directive.state.sortColumn?.name).toEqual("test");
    expect(directive.state.sortColumn?.sortDir).toEqual('desc');

  });

  it('should set sort column as testOther:desc', () => {

    const directive = des[0].injector.get(DatatableWrapperDirective) as DatatableWrapperDirective;

    directive.state = {
      length: 10,
      page: 1,
      sortColumn: {
        name: 'test',
        sortDir: 'asc'
      }
    }

    directive.sort('testOther');

    expect(directive.state.sortColumn?.name).toEqual("testOther");
    expect(directive.state.sortColumn?.sortDir).toEqual('desc');

  });
  

  it('should changes the length', () => {

    const directive = des[0].injector.get(DatatableWrapperDirective) as DatatableWrapperDirective;

    directive.state = {
      length: 10,
      page: 1
    }

    directive.changeLength(25);

    expect(directive.state.length).toEqual(25);

  });

  it('should changes the page to 1 when length changed', () => {

    const directive = des[0].injector.get(DatatableWrapperDirective) as DatatableWrapperDirective;

    directive.state = {
      length: 10,
      page: 1
    }

    directive.changeLength(25);

    expect(directive.state.page).toEqual(1);

  });


  it('should search a value', () => {

    const directive = des[0].injector.get(DatatableWrapperDirective) as DatatableWrapperDirective;

    directive.state = {
      length: 10,
      page: 1
    }

    directive.search('test search');

    expect(directive.state.searchValue).toEqual('test search');

  });

  it('should change page', () => {

    const directive = des[0].injector.get(DatatableWrapperDirective) as DatatableWrapperDirective;

    directive.state = {
      length: 10,
      page: 1
    }

    directive.changePage(2);

    expect(directive.state.page).toEqual(2);

  });

});
