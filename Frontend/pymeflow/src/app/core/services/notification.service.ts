import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}

  getNotifications(){
    return this.http.get<any[]>(`${environment.apiUrl}/notifications`);
  }

  markAsRead(id:number){
    return this.http.put(`${environment.apiUrl}/notifications/${id}/read`, {});
  }

}