import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Country} from './models/country';
import {HttpClient} from '@angular/common/http';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url = 'https://covid19-api.org/api';

  constructor(private httpClient: HttpClient, private logService: LogService) { }

  private log(message: string): void{
    this.logService.add(`CountryService: ${message}`);
  }

  // Returns all the available countries.
  getCountries(): Observable<Country[]>{
    this.log('Fetched all Countries.');
    return this.httpClient.get<Country[]>(this.url + '/countries');
  }

  // Returns specific country.
  getCountry(name: string): Observable<Country>{
    this.log(`Fetched Country by Name: ${name}`);
    return this.httpClient.get<Country>(this.url + '/countries/' + name);
  }
}
