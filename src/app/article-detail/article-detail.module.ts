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
import { CommentBoxComponent } from 'elements/commentBox/comment-box.component';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleDetailRoutingModule } from './article-detail-routing.module';
import { CommentBoxService } from 'elements/commentBox/comment-box.service';

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
    MarkdownModule.forChild(),
    ArticleDetailRoutingModule
  ],
  providers: [CommentBoxService],
  entryComponents: [CommentBoxComponent]
})
export class ArticleDetailModule { }
