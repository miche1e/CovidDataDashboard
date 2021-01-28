import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {Status} from '../../models/status';

@Component({
  selector: 'app-nations',
  templateUrl: './nations.component.html',
  styleUrls: ['./nations.component.css']
})
export class NationsComponent implements OnInit {

  view = [1200, 430];

  filters: any[] = [undefined, ['IT', 'US']];

  multi: any[];
  data: any[] = [];

  /*
  [
    {
      name: 'bau',
      series: [
        {
          name: 'wewe',
          value: 2
        },
        {
          name: 'cicale',
          value: 96
        }
      ]
    },
    {
      name: 'prgnao',
      series: [
        {
          name: 'wewe',
          value: 91
        },
        {
          name: 'cicale',
          value: 203
        }
      ]
    },
  ];
  */

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

  constructor(private apiService: ApiService) {
  }

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
    const supportArray: any[] = [];
    for (const name of this.filters[1]) {
      this.apiService.getTimelineByCountry(name).subscribe((res) => {
        supportArray.push({
          name,
          series: this.transformJson(res)
        });
        supportArray.reverse();
        this.data = supportArray;
      });
    }
    console.log('--------for oninit--------');
    console.log(supportArray);
  }

  getOutputValue(selected: string[]): void {
    if (selected) {
      this.filters = selected;
    }
  }

  private transformJson(statuses: Status[]): any[] {
    const seriesArray: any[] = [];
    for (const status of statuses) {
      seriesArray.push({
        name: status.last_update,
        value: status.cases
      });
    }
    return seriesArray;
  }

  /*
    private transformJsonTwo(day: Day[]): void {
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
      this.casesArray.reverse();
      this.deathsArray.reverse();
      this.recoveredArray.reverse();
      this.data = [this.totalCases, this.totalDeaths, this.totalRecovered];
      console.log('--------transform json--------');
      console.log(this.data);
    }
  */

  onResize(event): void {
    this.view = [event.target.innerWidth / 1.35, 400];
  }

}
