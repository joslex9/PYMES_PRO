import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.taskService.getMyTasks().subscribe({
      next: (tasks: any[]) => {

        const today = new Date();

        this.notifications = tasks.map(task => {

          const deadline = new Date(task.deadline);

          // 🔴 ATRASADA
          if (deadline < today && task.status !== 'COMPLETADA') {
            return {
              message: `⚠️ Tu tarea "${task.title}" está atrasada`,
              type: 'late'
            };
          }

          // 🟡 PENDIENTE (recién asignada)
          if (task.status === 'PENDIENTE') {
            return {
              message: `📌 Se te asignó la tarea "${task.title}"`,
              type: 'pending'
            };
          }

          // 🟢 COMPLETADA
          if (task.status === 'COMPLETADA') {
            return {
              message: `✅ Completaste "${task.title}"`,
              type: 'done'
            };
          }

          return null;

        }).filter(n => n !== null);

        // 🔥 OPCIONAL: solo mostrar las 5 más importantes
        this.notifications = this.notifications.slice(0, 5);

      },
      error: (err) => {
        console.error('Error cargando notificaciones:', err);
      }
    });
  }

}