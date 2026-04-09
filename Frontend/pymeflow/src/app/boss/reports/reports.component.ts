import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  stats = {
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0
  };

  constructor(private taskService: TaskService){}

  ngOnInit(){
    this.loadData();
  }

  loadData(){

   this.taskService.getTasks().subscribe((tasks: any[]) => {

      this.stats.total = tasks.length;
      this.stats.completed = tasks.filter(t=>t.status==='APROBADA').length;
      this.stats.pending = tasks.filter(t=>t.status==='PENDIENTE').length;
      this.stats.inProgress = tasks.filter(t=>t.status==='EN_PROCESO').length;

      this.createChart();

    });

  }

  createChart(){

    const ctx:any = document.getElementById('tasksChart');

    new Chart(ctx,{
      type:'doughnut',
      data:{
        labels:['Completadas','En Proceso','Pendientes'],
        datasets:[{
          data:[
            this.stats.completed,
            this.stats.inProgress,
            this.stats.pending
          ]
        }]
      }
    });

  }

}