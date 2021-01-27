import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Day} from './models/day';

@Injectable({
  providedIn: 'root'
})
export class JsonCommuterService {

  casesArray: any[] = [];
  totalCases = {
    name: 'Total Cases',
    series: this.casesArray
  };

  deathsArray: any[] = [];
  totalDeaths = {
    name: 'Total Deaths',
    series: this.deathsArray
  };

  recoveredArray: any[] = [];
  totalRecovered = {
    name: 'Total Recovered',
    series: this.recoveredArray
  };

  constructor(private apiService: ApiService) {
  }

  private transformJson(day: Day[]): void {
    for (const item of day) {
      this.casesArray.push({
        name: item.last_update,
        value: item.total_cases
      });
      this.deathsArray.push({
        name: item.last_update,
        value: item.total_deaths
      });
      this.recoveredArray.push({
        name: item.last_update,
        value: item.total_recovered
      });
    }
    console.log('----transform json f-------');
    console.log(this.casesArray);
  }

  getData(): any[] {
    this.apiService.getTimeline().subscribe((res) => {
      this.transformJson(res);
    });
    console.log('----get data f-------');
    console.log(this.casesArray);
    return [this.totalCases, this.totalDeaths, this.totalRecovered];
  }
}
