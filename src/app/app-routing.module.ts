import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@/home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: '分享前端技术和心得的个人网站' }
  },
  {
    path: 'articleList',
    loadChildren: '@/article-list/article-list.module#ArticleListModule'
  },
  {
    path: 'articleDetail/:id',
    loadChildren: '@/article-detail/article-detail.module#ArticleDetailModule'
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
