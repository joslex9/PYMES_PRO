import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateTaskService {

constructor(private http:HttpClient){}

createTask(data:any){
return this.http.post(`${environment.apiUrl}/tasks`,data);
}

getTasks(){
return this.http.get(`${environment.apiUrl}/tasks`);
}

getMyTasks(){
return this.http.get(`${environment.apiUrl}/mytasks`);
}

}