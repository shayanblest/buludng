import { Component, Input, OnInit } from '@angular/core';
import { AlertTypesEnum } from '../../enums/alert-types.enum';
import { AlertModel } from '../../models/alert.model';

@Component({
  selector: 'bng-alert',
  templateUrl: './bng-alert.component.html',
  styleUrls: ['./bng-alert.component.css']
})
export class BngAlertComponent implements OnInit {

  constructor() { }

  @Input() alert?: AlertModel;

  alertTypes = AlertTypesEnum;

  ngOnInit() {
  }

}
