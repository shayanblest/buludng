/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BngModalService } from './bng-modal.service';

describe('Service: BngModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BngModalService]
    });
  });

  it('should ...', inject([BngModalService], (service: BngModalService) => {
    expect(service).toBeTruthy();
  }));
});
