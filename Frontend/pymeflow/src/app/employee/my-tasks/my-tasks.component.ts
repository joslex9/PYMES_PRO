import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  tasks: any[] = [];
  userName = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

 ngOnInit() {

  try {
    const user = localStorage.getItem('user');
    this.userName = user ? JSON.parse(user).name : 'Usuario';
  } catch {
    this.userName = 'Usuario';
  }

  this.loadTasks();
}

  loadTasks(){
    this.taskService.getMyTasks().subscribe({
      next:(res:any)=>{
        this.tasks = res;
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }

  goToUpload(taskId:number){
    this.router.navigate(['/employee/upload-evidence', taskId]);
  }
  changeStatus(taskId:number, event:any){
  const status = event.target.value;

  this.taskService.updateStatus(taskId, status)
    .subscribe(()=>{
      alert("Estado actualizado");
      this.loadTasks();
    });
}

  getStatus(task:any){
    if(task.status === 'APROBADA') return 'COMPLETADA';
    if(task.status === 'RECHAZADA') return 'RECHAZADA';
    if(task.status === 'EN_AJUSTES') return 'AJUSTES';

    const today = new Date();
    const deadline = new Date(task.deadline);

    if(deadline < today) return 'ATRASADO';

    return 'PENDIENTE';
  }

}