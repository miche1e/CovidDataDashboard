import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {Status} from '../models/status';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CountryService} from '../country.service';
import { Country} from '../models/country';

@Component({
  selector: 'app-status-data',
  templateUrl: './status-data.component.html',
  styleUrls: ['./status-data.component.css']
})
export class StatusDataComponent implements OnInit {

  STATUS_DATA: Status[] = [];
  countries: Country[] = [];
  displayedColumns: string[] = ['alpha2', 'country', 'last_update', 'cases', 'deaths', 'recovered'];
  dataSource = new MatTableDataSource<Status>(this.STATUS_DATA);


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private apiService: ApiService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllReports();

    this.countryService.getCountries().subscribe( countries => {
      this.countries = countries;
    });
  }


  getAllReports(): void{
    const resp = this.apiService.getStatus();
    resp.subscribe(status => this.dataSource.data = status );
  }

  composeDate(date): string {
    const y: number = new Date(date).getFullYear();
    const m: number = new Date(date).getMonth() + 1;
    const d: number = new Date(date).getDate();
    return y + ' - ' + d + ' - ' + m;
  }

  getCountryName( countryCode: string ): string {
    for (const country of this.countries){
      if (country.alpha2 === countryCode){
        return country.name;
      }
    }
  }

    applyFilter(filterValue: string): void {
     this.dataSource.filter = filterValue.trim().toLowerCase();

  }

}
