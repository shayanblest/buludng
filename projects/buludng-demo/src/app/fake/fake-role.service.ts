import { Injectable } from '@angular/core';
import { DataTableRequest, DataTableResponse } from 'projects/buludng/datatable';
import { Observable, of } from 'rxjs';
import { RoleModel } from '../models/role.model';
import { FakeDB } from './fake.db';

@Injectable({
  providedIn: 'root'
})
export class FakeRoleService {

  constructor() { }


  getAll(req?: DataTableRequest): Observable<DataTableResponse<RoleModel>> {
    let res: DataTableResponse<RoleModel> = {
      data: FakeDB.roles,
      totalRecords: 20
    }
    if (req) {
      if (req.length > 10) {
        res.totalRecords = 5
      }
    }
    return of(res);
  }

}
