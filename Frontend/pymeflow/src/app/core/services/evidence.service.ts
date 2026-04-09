import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvidenceService {

  constructor(private http: HttpClient) {}

  uploadEvidence(data:any){
    return this.http.post('http://localhost:4000/evidence/upload', data);
  }

  getTaskEvidences(id:any){
    return this.http.get(`http://localhost:4000/evidence/${id}`);
  }

}