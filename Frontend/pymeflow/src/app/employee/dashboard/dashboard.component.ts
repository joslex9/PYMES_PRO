import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../src/app/core/services/dashboard.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats:any = {
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    lateTasks: 0
  };

  userName:string = 'Empleado';

  constructor(private dashboardService:DashboardService){}

  ngOnInit(): void {

    this.loadStats();
    this.loadUser();

  }

  loadStats(){

    this.dashboardService.getEmployeeStats()
    .subscribe({
      next:(res:any)=>{
        this.stats = res;
      },
      error:(err)=>{
        console.error(err);
      }
    });

  }

  loadUser(){

    const user = localStorage.getItem('user');

    if(user){
      const parsed = JSON.parse(user);
      this.userName = parsed.name;
    }

  }

}