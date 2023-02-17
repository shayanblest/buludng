import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableDirective, DataTableRequest, DataTableResponse } from 'projects/buludng/datatable';
import { FakeRoleService } from '../../fake/fake-role.service';
import { RoleModel } from '../../models/role.model';

@Component({
  selector: 'app-demo-datatable',
  templateUrl: './demo-datatable.component.html',
  styleUrls: ['./demo-datatable.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DemoDatatableComponent implements OnInit {

  constructor(
    private roleService: FakeRoleService
  ) { }

  roles: RoleModel[] = [];

  @ViewChild('roleDatatable', { read: DatatableDirective }) dataTable?: DatatableDirective;

  totalRecords: number = 0;

  ngOnInit() {
    this.roleService.getAll().subscribe((res: DataTableResponse<RoleModel>) => {
      this.roles = res.data;
      this.totalRecords = res.totalRecords;
    });
  }


  changedDatatable(request: DataTableRequest) {
    console.log(request);
    this.roleService.getAll(request).subscribe((res: DataTableResponse<RoleModel>) => {
      this.roles = res.data;
      this.totalRecords = res.totalRecords;
    });
  }
}
