import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private dataSubject = new Subject<any>();
  data: Observable<any> = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }

  constructor() { }

  public getContext() {
    return JSON.parse(localStorage.getItem('context')!);
  }

  public setContext(context: any) {
    localStorage.setItem('context', JSON.stringify(context));
  }

  public clearStorage() {
    localStorage.clear();
  }
}
