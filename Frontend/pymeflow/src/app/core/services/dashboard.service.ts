import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getStats(){
    return this.http.get('http://localhost:4000/api/dashboard/stats');
  }

  getEmployeeStats(){
  return this.http.get(`${environment.apiUrl}/employee/dashboard`);
}

}