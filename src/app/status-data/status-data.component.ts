import { Component, OnInit, ViewChild } from '@angular/core';
import {ApiService} from '../api.service';
import {Status} from '../models/status';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

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
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllReports();
  }


  getAllReports(): void{
    const resp = this.apiService.getStatus();
    resp.subscribe(status => this.dataSource.data = status );
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
