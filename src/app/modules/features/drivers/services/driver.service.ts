import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

    env = environment;
    taskManagersURL = environment.hostURL;
    constructor(private http: HttpClient) { }

    getDriversList(): Observable<any> {
      let url = `${this.taskManagersURL}/api/drivers/all`;
        return this.http.get(url) as Observable<any>;
      }
}
