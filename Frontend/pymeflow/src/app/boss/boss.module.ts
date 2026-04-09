import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { BossDashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  // ⛔️ NO usar declarations para componentes standalone
  imports: [
    CommonModule,
    RouterModule,

    // ✅ componentes standalone se importan aquí
    TasksComponent,
    BossDashboardComponent
  ]
})
export class BossModule {}