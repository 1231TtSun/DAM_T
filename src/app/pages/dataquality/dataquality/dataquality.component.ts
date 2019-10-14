import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../../service/report.service';
import {TableRedundancy} from '../../../pojo/report';
import {Integrity} from '../../../pojo/report';

@Component({
  selector: 'app-dataquality',
  templateUrl: './dataquality.component.html',
  styleUrls: ['./dataquality.component.css']
})
export class DataqualityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
