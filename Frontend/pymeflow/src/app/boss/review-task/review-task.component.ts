import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EvidenceService } from '../../core/services/evidence.service';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-review-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-task.component.html',
  styleUrls: ['./review-task.component.css']
})
export class ReviewTaskComponent implements OnInit {

  taskId: any;
  task: any = {};
  evidences: any[] = [];
  feedback = '';
  status = '';

  constructor(
    private route: ActivatedRoute,
    private evidenceService: EvidenceService,
    private taskService: TaskService
  ) {}

  ngOnInit(){
    this.taskId = this.route.snapshot.params['id'];
    this.loadTask();
    this.loadEvidence();
  }

  loadTask(){
    this.taskService.getTask(this.taskId)
    .subscribe((res:any)=>{
      this.task = res;
    });
  }

  loadEvidence(){
    this.evidenceService.getTaskEvidences(this.taskId)
    .subscribe((res:any)=>{
      this.evidences = res;
    });
  }

  // 🔥 detectar si es imagen
  isImage(file:any){
    return file.file_url.match(/\.(jpg|jpeg|png|webp)$/);
  }

  // 🔥 abrir archivo
  openFile(file:any){
    const url = 'http://localhost:4000/' + file.file_url;
    window.open(url, '_blank');
  }

  // 🔥 seleccionar estado
  setStatus(status:string){
    this.status = status;
  }

  // 🔥 guardar revisión
  saveReview(){

    if(!this.status){
      alert("Selecciona una acción");
      return;
    }

    this.taskService.updateStatus(this.taskId, this.status)
    .subscribe(()=>{
      alert("Calificación guardada");
    });

  }

}