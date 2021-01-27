import { Component, OnInit, ViewChild } from '@angular/core';
import {ApiService} from '../api.service';
import {Status} from '../models/status';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import {CountryService} from '../country.service';

@Component({
  selector: 'app-status-data',
  templateUrl: './status-data.component.html',
  styleUrls: ['./status-data.component.css']
})
export class StatusDataComponent implements OnInit {

  STATUS_DATA: Status[] = [];
  displayedColumns: string[] = ['country', 'last_update', 'cases', 'deaths', 'recovered'];
  dataSource = new MatTableDataSource<Status>(this.STATUS_DATA);


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private apiService: ApiService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllReports();
  }


  getAllReports(): void{
    const resp = this.apiService.getStatus();
    resp.subscribe(status => this.dataSource.data = status );
  }

}
