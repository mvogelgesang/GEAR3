import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  // Investment
  private investSource = new Subject();
  currentInvest = this.investSource.asObservable();

  // Capability
  private capSource = new Subject();
  currentCap = this.capSource.asObservable();

  // Organization
  private orgSource = new Subject();
  currentOrg = this.orgSource.asObservable();

  // Parent System
  private sysSource = new Subject();
  currentSys = this.sysSource.asObservable();

  constructor() { }

  updateDetails(row: {}, component: string) {
    if (component == 'investment') {
      this.investSource.next(row);
    } else if (component == 'capability') {
      this.capSource.next(row);
    } else if (component == 'organization') {
      this.orgSource.next(row);
    } else if (component == 'system') {
      this.sysSource.next(row);
    } else {
      console.log("Error: Not a valid component to update details");
    }
  }
}
