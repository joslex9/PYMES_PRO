import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
providedIn:'root'
})
export class UserService{

constructor(private http:HttpClient){}

getTeam(){
return this.http.get(`${environment.apiUrl}/team`);
}

}