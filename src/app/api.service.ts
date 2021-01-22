import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Status } from './models/status';
import {Observable} from 'rxjs';
import {Day} from './models/day';
import {Prediction} from './models/prediction';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://covid19-api.org/api/status';

  constructor(private httpClient: HttpClient, private logService: LogService) { }

  private log(message: string): void{
    this.logService.add(`ApiService: ${message}`);
  }

  // Returns latest state for all available countries.
  getStatus(): Observable<Status[]>{
    this.log('Fetched Status.');
    return this.httpClient.get<Status[]>(this.url);
  }

  // Returns latest state for a specific country.
  getStatusByCountry(name: string): Observable<Status>{
    this.log('Fetched Status by Country.');
    return this.httpClient.get<Status>(this.url + '/' + name);
  }

  // Returns countries state for a specific date.
  getStatusByDate(date: string): Observable<Status[]>{
    this.log('Fetched Status by Date.');
    return this.httpClient.get<Status[]>(this.url + '?date=' + date);
  }

  // Returns state for a specific country and date.
  getStatusByCountryAndDate(name: string, date: string): Observable<Status>{
    this.log('Fetched Status by Country and Date.');
    return this.httpClient.get<Status>(this.url + '/' + name + '?date=' + date);
  }

  // Returns total cases timeline.
  getTimeline(): Observable<Day>{
    this.log('Fetched Timeline.');
    return this.httpClient.get<Day>(this.url + '/timeline');
  }

  // Returns timeline for a specific country.
  getTimelineByCountry(name: string): Observable<Status[]>{
    this.log('Fetched Timeline by Country.');
    return this.httpClient.get<Status[]>(this.url + '/timeline/' + name);
  }

  // Returns two weeks prediction for a specific country.
  getPrediction(name: string): Observable<Prediction>{
    this.log('Fetched Prediction.');
    return this.httpClient.get<Prediction>(this.url + '/prediction/' + name);
  }
}
