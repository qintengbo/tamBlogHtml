import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule, NzPaginationModule } from 'ng-zorro-antd';
import { ArticleListComponent } from './article-list.component';
import { ArticleListRoutingModule } from './article-list-routing.module';

@NgModule({
  declarations: [
    ArticleListComponent
  ],
  imports: [
    CommonModule,
    NzIconModule,
    NzPaginationModule,
    ArticleListRoutingModule
  ]
})
export class ArticleListModule { }
