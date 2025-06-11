import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  private activeTabSubject = new BehaviorSubject<string>('employee');
  activeTab$ = this.activeTabSubject.asObservable();

  setActiveTab(tab: string) {
    this.activeTabSubject.next(tab);
  }
}