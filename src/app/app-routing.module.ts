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
    loadChildren: () => import('@/article-list/article-list.module').then(m => m.ArticleListModule)
  },
  {
    path: 'articleDetail/:id',
    loadChildren: () => import('@/article-detail/article-detail.module').then(m => m.ArticleDetailModule)
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
  imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
