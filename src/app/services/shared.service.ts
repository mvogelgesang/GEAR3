import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  toggleEmitter = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  toggleClick() {
    this.toggleEmitter.emit();
  }
}
