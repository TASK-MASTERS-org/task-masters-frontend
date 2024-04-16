import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobFeedbackManagementService {
  env = environment;
  taskManagersURL = environment.hostURL;
  constructor(private http: HttpClient) { }

  getJobPostsByUserId(userId: number): Observable<any> {
    const url = `${this.taskManagersURL}/api/job-posts/get-all-job-post-by-user`;
    const params = { userId: userId.toString() };
    return this.http.get(url, { params }) as Observable<any>;
  }

  UpdateJobPost(id: number,data:any): Observable<any> {
    const url = `${this.taskManagersURL}/api/job-posts/update`;
    const params = { id: id.toString() };
    return this.http.put(url, data, { params }) as Observable<any>;
  }

  DeleteJobPost(id: number): Observable<any> {
    const url = `${this.taskManagersURL}/api/job-posts/delete`;
    const params = { id: id.toString() };
    return this.http.delete (url,{ params }) as Observable<any>;
  }
}
