import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {Day} from '../../models/day';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  view = [1200, 500];

  multi: any[];

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


  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Population';
  timeline = true;

  colorScheme = {
    domain: ['#fabd24', '#f80101', '#39ff02']
  };

  data: any[] = [];

  constructor(private apiService: ApiService) { }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    this.apiService.getTimeline().subscribe((res) => {
      this.transformJson(res);
      console.log('-------res---------');
      console.log(res);
    });
    console.log('-------ciaoooneeeee---------');
    console.log(this.data);
  }

  private transformJson(day: Day[]): void {
    for (const item of day) {
      this.casesArray.push({
        name: item.last_update.slice(0, 10),
        value: item.total_cases
      });
      this.deathsArray.push({
        name: item.last_update.slice(0, 10),
        value: item.total_deaths
      });
      this.recoveredArray.push({
        name: item.last_update.slice(0, 10),
        value: item.total_recovered
      });
    }
    this.casesArray.reverse();
    this.deathsArray.reverse();
    this.recoveredArray.reverse();
    this.data = [this.totalCases, this.totalDeaths, this.totalRecovered];
    console.log('--------transform json--------');
    console.log(this.data);
  }

  onResize(event): void {
    this.view = [event.target.innerWidth / 1.35, 400];
  }
}
