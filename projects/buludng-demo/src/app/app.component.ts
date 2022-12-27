import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataTableResponse } from 'buludng/datatable';
import { DataTableColumn, DataTableOptions, DataTableRequest } from 'buludng/datatable';
import { BngModalService } from 'buludng/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(
    private modalService: BngModalService,
    private http: HttpClient
  ) { }


  data?: DataTableResponse<any>;


  datePicker: FormControl = new FormControl();

  title = 'buludng-demo';

  dtOptions: DataTableOptions = {
    showInUrl: true
  }

  ngOnInit(): void {
  }

  changedDatatable(request: DataTableRequest) {
    this.http.post("https://localhost:7172/api/v1/Identity/Account/GetAllAsDataTable", request)
      .subscribe((res: any) => {
        this.data = res;
      })
  }

  openModal(targetModal: TemplateRef<any>) {
    this.modalService.openModal(targetModal);
  }

  closeModal() {
    this.modalService.closeModal();
  }

}