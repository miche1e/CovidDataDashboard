import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CountryService} from '../../country.service';
import {Country} from '../../models/country';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  countries: Country[] = [];

  datePicked = new FormControl(moment());

  selectedDate;
  selectedData = 'total_cases';
  selectedCountry: string;
  @Output() outputParent = new EventEmitter<string[]>();

  notificationToParent(selected: string[]): void{
    this.outputParent.emit(selected);
  }

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(res => this.countries = res);
    console.log(this.selectedDate);
  }

  composeDate(): void{
    const y: number = new Date(this.datePicked.value).getFullYear();
    const m: number = new Date(this.datePicked.value).getMonth() + 1;
    const d: number = new Date(this.datePicked.value).getDate();
    const date = y + '-' + m + '-' + d;
    this.selectedDate = date;
  }
}
