import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule, NzTagModule, NzDividerModule, NzButtonModule } from 'ng-zorro-antd';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleDetailRoutingModule } from './article-detail-routing.module';

@NgModule({
  declarations: [
    ArticleDetailComponent
  ],
  imports: [
    CommonModule,
    NzIconModule,
    NzTagModule,
    NzDividerModule,
    NzButtonModule,
    MarkdownModule.forChild(),
    ArticleDetailRoutingModule
  ]
})
export class ArticleDetailModule { }
