import { Routes } from '@angular/router';
import { LoginUserComponent } from '../containers/login-user/login-user.component';
import { MainComponent } from 'shared';
import { DashboardComponent } from '../containers/dashboard/dashboard.component';

export const usersRoutes: Routes = [
  {
    path: 'login',
    component: LoginUserComponent,
  },
  {
    path:'app',
    component:MainComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      }
    ]
  }
];
