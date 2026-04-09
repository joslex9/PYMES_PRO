import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:any[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ){}

  ngOnInit(){
    this.loadTasks();
  }

  loadTasks(){
    this.taskService.getTasks().subscribe((res:any)=>{
      this.tasks = res;
    });
  }

  goToReview(id:any){
    this.router.navigate(['/boss/review-task', id]);
  }

}