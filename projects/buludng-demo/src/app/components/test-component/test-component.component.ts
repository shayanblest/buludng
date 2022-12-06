import { Component, OnInit } from '@angular/core';
import { BngModalService } from 'buludng/modal';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  constructor(
    private modalService: BngModalService
  ) { }

  ngOnInit() {
    console.log("opened");
  }


  closeModal() {
    this.modalService.closeModal();
  }

}
