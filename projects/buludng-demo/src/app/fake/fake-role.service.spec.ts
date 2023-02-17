/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FakeRoleService } from './fake-role.service';

describe('Service: FakeRole', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeRoleService]
    });
  });

  it('should ...', inject([FakeRoleService], (service: FakeRoleService) => {
    expect(service).toBeTruthy();
  }));
});
