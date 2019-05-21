import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@/home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: '首页' }
  },
  {
    path: 'articleList',
    loadChildren: '@/article-list/article-list.module#ArticleListModule'
  },
  {
    path: 'articleDetail',
    loadChildren: '@/article-detail/article-detail.module#ArticleDetailModule'
  },
  {
    path: 'steppingPit',
    loadChildren: '@/stepping-pit/stepping-pit.module#SteppingPitModule'
  },
  // 路由重定向
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  // 通用路由，跳转至404页面等
  // { path: '**', component: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
