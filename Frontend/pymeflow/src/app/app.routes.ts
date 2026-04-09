import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';

import { DashboardComponent } from './employee/dashboard/dashboard.component';
import { MyTasksComponent } from './employee/my-tasks/my-tasks.component';
import { UploadEvidenceComponent } from './employee/upload-evidence/upload-evidence.component';
import { ReportsComponent } from './boss/reports/reports.component';
import { BossDashboardComponent } from './boss/dashboard/dashboard.component';
import { CreateTaskComponent } from './boss/create-task/create-task.component';
import { TeamComponent } from './boss/team/team.component';
import { ReviewTaskComponent } from './boss/review-task/review-task.component';
import { authGuard } from './core/guards/auth.guard';
import { TasksComponent } from './boss/tasks/tasks.component';
import { NotificationsComponent } from './employee/notifications/notifications.component';
export const routes: Routes = [

{
  path: '',
  component: LoginComponent
},

// EMPLEADO
{
  path: 'employee',
  component: MainLayoutComponent,
  canActivate:[authGuard],
  children: [
    { path: 'tasks', component: MyTasksComponent },
    { path: 'upload-evidence/:id', component: UploadEvidenceComponent },
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    {path: 'notifications',component: NotificationsComponent}
  ]
},

{
  path:'',
  component:LoginComponent
},

{
 path:'boss',
 component:MainLayoutComponent,
 canActivate:[authGuard],
 children:[
  { path: 'dashboard', component: BossDashboardComponent },
  { path:'reports', component:ReportsComponent },

  { path:'dashboard', component:BossDashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path:'create-task', component:CreateTaskComponent },
  { path: '', redirectTo: 'create-task', pathMatch: 'full' },
  { path:'team', component:TeamComponent },

  { path:'review-task/:id', component:ReviewTaskComponent }

 ]
}

];