import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    env = environment;
    taskManagersURL = environment.hostURL;
    constructor(private http: HttpClient) { }

    getOrders(get: any): Observable<any> {
      let url = `${this.taskManagersURL}/api/get-orders/`;

        return this.http.get(url, get) as Observable<any>;
      }
}
