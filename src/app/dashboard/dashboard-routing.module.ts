import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '@/home/home.component';

const dashboardRoutes: Routes = [
  {
    path: '', // 页头和页尾
    component: DashboardComponent,
    children: [
      {
        path: 'home', // 首页
        component: HomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class DashboardRoutingModule { }
