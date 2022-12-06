import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private modalService: BngModalService
  ) { }

  title = 'buludng-demo';

  dtOptions: DataTableOptions = {
    showInUrl: true
  }

  ngOnInit(): void {
    
  }

  changedDatatable(request: DataTableRequest) {
    console.log(request);
  }

  openModal(targetModal: TemplateRef<any>) {
    this.modalService.openModal(targetModal);
  }
  
  closeModal() {
    this.modalService.closeModal();
  }

}