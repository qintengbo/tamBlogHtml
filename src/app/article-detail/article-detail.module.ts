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
  NzFormModule,
  NzPaginationModule,
  NzModalModule,
  NzPopoverModule
} from 'ng-zorro-antd';
import { MarkdownModule } from 'ngx-markdown';
import { CommentBoxComponent } from 'elements/commentBox/comment-box.component';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleDetailRoutingModule } from './article-detail-routing.module';

@NgModule({
  declarations: [
    CommentBoxComponent,
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
    NzModalModule,
    NzPaginationModule,
    NzPopoverModule,
    MarkdownModule.forChild(),
    ArticleDetailRoutingModule
  ],
  entryComponents: [CommentBoxComponent]
})
export class ArticleDetailModule { }
