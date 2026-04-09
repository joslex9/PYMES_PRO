import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  // 🔐 HEADERS CON TOKEN
  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // ✅ CREAR TAREA
  createTask(data:any){
    return this.http.post(
      `${environment.apiUrl}/tasks`,
      data,
      this.getHeaders()
    );
  }

  // ✅ TODAS LAS TAREAS (JEFE)
  getTasks(){
    return this.http.get<any[]>(
      `${environment.apiUrl}/tasks`,
      this.getHeaders()
    );
  }

  // ✅ MIS TAREAS (EMPLEADO)
  getMyTasks(){
  return this.http.get<any[]>(
    `${environment.apiUrl}/mytasks`,
    this.getHeaders()
  );
}

  // ✅ OBTENER UNA TAREA
  getTask(id:any){
    return this.http.get(
      `${environment.apiUrl}/tasks/${id}`,
      this.getHeaders()
    );
  }

  // ✅ ACTUALIZAR ESTADO
  updateStatus(id:any,status:any){
    return this.http.put(
      `${environment.apiUrl}/tasks/${id}/status`,
      {status},
      this.getHeaders()
    );
  }

}