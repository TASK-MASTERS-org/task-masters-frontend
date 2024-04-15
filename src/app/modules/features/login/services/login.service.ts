import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  env = environment;
  taskManagersURL = environment.hostURL;

  constructor(private http: HttpClient) { }

  login(loginInfo: any): Observable<any> {
    let url = `${this.taskManagersURL}/api/users/authenticate`;
    return this.http.post(url, loginInfo) as Observable<any>;
  }

  //user context API

  forgotPassDetails(email:string): Observable<any> {
    let url = `${this.taskManagersURL}/api/users/forgot-password`;
    return this.http.post(url, { email }) as Observable<any>;
  }

  resetPassword(token:string, newPassword: string): Observable<any> {
    let url = `${this.taskManagersURL}/api/users/forgot-password`;
    return this.http.post(url, { token, newPassword }) as Observable<any>;
  }
}
