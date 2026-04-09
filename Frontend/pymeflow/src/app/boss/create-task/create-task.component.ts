import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { TeamService } from '../../core/services/team.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  title = '';
  description = '';
  assigned_to = '';
  deadline = '';
  priority = 'Media';

  employees:any[] = [];

  constructor(
    private taskService: TaskService,
    private teamService: TeamService
  ){}

  ngOnInit(){

    this.teamService.getTeam().subscribe((res:any)=>{
      this.employees = res;
    });

  }

  createTask(){

    if(!this.title || !this.assigned_to){
      alert("Debes completar el título y seleccionar un empleado.");
      return;
    }

    const data = {
      title: this.title,
      description: this.description,
      assigned_to: this.assigned_to,
      deadline: this.deadline,
      priority: this.priority
    };

    this.taskService.createTask(data).subscribe({
      next: ()=>{
        alert("Tarea creada correctamente");

        // limpiar formulario
        this.title='';
        this.description='';
        this.assigned_to='';
        this.deadline='';
        this.priority='Media';
      },
      error:()=>{
        alert("Error al crear la tarea");
      }
    });

  }

}