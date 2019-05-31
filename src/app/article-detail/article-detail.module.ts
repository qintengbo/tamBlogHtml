import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NzIconModule,
  NzTagModule,
  NzDividerModule,
  NzButtonModule,
  NzInputModule,
  NzGridModule,
  NzFormModule
} from 'ng-zorro-antd';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleDetailRoutingModule } from './article-detail-routing.module';

@NgModule({
  declarations: [
    ArticleDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzTagModule,
    NzDividerModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzFormModule,
    MarkdownModule.forChild(),
    ArticleDetailRoutingModule
  ]
})
export class ArticleDetailModule { }
