import { Injectable } from '@angular/core';
import {timestamp} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  messages: string[] = [];

  constructor() { }

  add(message: string): void{
    this.messages.push(message);
  }

  clear(): void{
    this.messages = [];
  }
}
