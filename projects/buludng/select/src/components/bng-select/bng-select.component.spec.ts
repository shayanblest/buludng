/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BngSelectComponent } from './bng-select.component';

describe('BngSelectComponent', () => {
  let component: BngSelectComponent;
  let fixture: ComponentFixture<BngSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BngSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BngSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
