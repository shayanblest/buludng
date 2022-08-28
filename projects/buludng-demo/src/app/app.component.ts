import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableColumn, DataTableOptions, DataTableRequest } from 'buludng/datatable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {


  constructor() { }

  title = 'buludng-demo';

  dtOptions: DataTableOptions = {
    showInUrl: true
  }

  ngOnInit(): void {
    
  }

  changedDatatable(request: DataTableRequest) {
    console.log(request);
  }
}