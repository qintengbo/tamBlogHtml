import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';
import { Article } from 'class/article/Article';
import { CommentBoxComponent } from 'elements/commentBox/comment-box.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.less']
})
export class ArticleDetailComponent implements OnInit {
  id: string; // 文章id
  preId: string; // 上一篇文章id
  nxtId: string; // 下一篇文章id
  articleInfo: Article;
  commentList = []; // 评论列表
  page = 1;
  size = 10;
  total = 0; // 全部评论条数
  mainTotal = 0; // 主评论条数
  moreComment = true;

  @ViewChild(CommentBoxComponent)
  private comment: CommentBoxComponent;

  @ViewChild(CommentBoxComponent)
  private parentComment: CommentBoxComponent;

  @ViewChild(CommentBoxComponent)
  private childComment: CommentBoxComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private httpRequestService: HttpRequestService,
    private message: NzMessageService
  ) { }

  // 获取文章详情
  getArticleInfo(id: string): void {
    this.httpRequestService.articleInfoRequest(id).subscribe(res => {
      const { code, data, msg } = res;
      if (code === 0) {
        this.articleInfo = data.articleData;
        this.preId = data.preId;
        this.nxtId = data.nxtId;
        this.titleService.setTitle(`覃腾波的个人博客 - ${data.articleData.title}`);
      } else {
        this.message.error(msg);
      }
    });
  }

  // 获取文章评论
  getArticleCommentList(id: string): void {
    const params = {
      page: this.page,
      size: this.size,
      relationId: id
    };
    this.httpRequestService.articleCommentListRequest(params).subscribe(res => {
      const { code, data, msg } = res;
      if (code === 0) {
        data.list.forEach(item => {
          item.isClick = false;
          if (item.reply.length > 0) {
            item.reply.forEach((childItem: { isClick: boolean; content: string; beCommenter: { name: any; }; }) => {
              childItem.isClick = false;
              childItem.content = `<span style="color: #51CCA8">@${childItem.beCommenter.name}</span>，` + childItem.content;
            });
          }
        });
        this.commentList = this.commentList.concat(data.list);
        this.total = data.total;
        this.mainTotal = data.mainTotal;
        if (this.page < Math.ceil(this.mainTotal / this.size)) {
          this.moreComment = true;
        } else {
          this.moreComment = false;
        }
      } else {
        this.message.error(msg);
      }
    });
  }

  // 返回文章列表
  goToList(): void {
    this.router.navigate(['/articleList']);
  }

  // 跳转到上一篇或下一篇
  goToOtherArticle(id: string): void {
    this.router.navigate(['/articleDetail', id]);
  }

  // 发送
  submitForm = (data: any) => {
    let ref: any;
    const params = {
      relationId: this.id,
      ...data.value,
      isMain: data.index >= 0 ? false : true,
      imgCode: data.imgCode
    };
    if (data.index >= 0) {
      if (data.parentNum >= 0) {
        params.commentId = this.commentList[data.parentNum]._id;
        params.aimsId = this.commentList[data.parentNum].reply[data.index]._id;
        params.beCommenter = this.commentList[data.parentNum].reply[data.index].commenter._id;
        ref = this.childComment;
      } else {
        params.commentId = this.commentList[data.index]._id;
        params.aimsId = this.commentList[data.index]._id;
        params.beCommenter = this.commentList[data.index].commenter._id;
        ref = this.parentComment;
      }
    } else {
      params.commentId = '';
      params.beCommenter = '';
      params.aimsId = '';
      ref = this.comment;
    }
    this.httpRequestService.addCommentRequest(params).subscribe(res => {
      const { code, msg } = res;
      if (code === 0) {
        this.commentList = [];
        this.message.success(msg);
        ref.cancelSubmit();
        this.getArticleCommentList(this.id);
        ref.handleCancel();
      } else {
        this.message.error(msg);
        ref.getNewImgCode();
      }
    });
  }

  // 回复
  reply(e: any, data: any, parent?: any, num?: number): void {
    e.preventDefault();
    data.isClick = !data.isClick;
    if (data.isMain) {
      data.reply.forEach((item: { isClick: boolean; }) => {
        item.isClick = false;
      });
    } else {
      parent.isClick = false;
      parent.reply.forEach((item: { isClick: boolean; }, index: number) => {
        if (index !== num) {
          item.isClick = false;
        }
      });
    }
  }

  // 加载更多评论
  loadMoreComment(): void {
    this.page += 1;
    if (this.page <= Math.ceil(this.mainTotal / this.size)) {
      this.getArticleCommentList(this.id);
    } else {
      this.moreComment = false;
      this.page -= 1;
    }
  }

  trackById(index: number, item: { _id: string }): string {
    return item._id;
  }

  ngOnInit() {
    this.articleInfo = {
      _id: '',
      title: '',
      coverImg: '',
      content: '',
      updateDate: '',
      lead: '',
      readNum: 0,
      classification: {},
      tag: [],
      status: 1,
      createDate: ''
    };
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getArticleInfo(this.id);
      this.getArticleCommentList(this.id);
    });
  }

}
