import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-boss-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class BossDashboardComponent implements OnInit {

  tasks:any[] = [];

  stats = {
    total:0,
    completed:0,
    inProgress:0,
    late:0
  };

  userName = 'Andrés';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){

    this.taskService.getTasks().subscribe((res:any)=>{

      this.tasks = res;

      this.stats.total = res.length;

      this.stats.completed =
      res.filter((t:any)=>t.status == 'APROBADA').length;

      this.stats.inProgress =
      res.filter((t:any)=>t.status == 'EN_REVISION').length;

      this.stats.late =
      res.filter((t:any)=>t.status == 'ATRASADA').length;

    });

  }

}