import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';
import { WINDOW } from 'services/window.service';
import { Article } from 'class/article/Article';
import { CommentBoxComponent } from 'elements/commentBox/comment-box.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.less']
})
export class ArticleDetailComponent implements OnInit, AfterViewInit {
  id: string; // 文章id
  preId: string; // 上一篇文章id
  nxtId: string; // 下一篇文章id
  articleInfo: Article;
  commentList = []; // 评论列表
  page = 1;
  size = 10;
  total = 0; // 全部评论条数
  mainTotal = 0; // 主评论条数
  commentScrollTop: 0;
  isVisible = false; // 模态框
  imgCodeSrc = ''; // 验证码svg
  imgCodeText = ''; // 验证码
  formData: any;

  @ViewChild(CommentBoxComponent)
  private comment: CommentBoxComponent;

  @ViewChild('commentTitle')
  commentTitle: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private httpRequestService: HttpRequestService,
    private message: NzMessageService,
    @Inject(WINDOW) private window: Window
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
        this.commentList = data.list;
        this.total = data.total;
        this.mainTotal = data.mainTotal;
        this.commentList.forEach(item => {
          item.isClick = false;
          if (item.reply.length > 0) {
            item.reply.forEach((childItem: { isClick: boolean; content: string; beCommenter: { name: any; }; }) => {
              childItem.isClick = false;
              childItem.content = `<span style="color: #51CCA8">@${childItem.beCommenter.name}</span>，` + childItem.content;
            });
          }
        });
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

  // 更新验证码
  getNewImgCode(): void {
    this.imgCodeSrc = `${this.httpRequestService.getImgCode()}?${Math.random()}`;
  }

  // 发送
  submitForm = (data: any) => {
    this.isVisible = true;
    this.imgCodeSrc = `${this.httpRequestService.getImgCode()}?${Math.random()}`;
    this.formData = data;
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

  // 分页
  pageIndexChange(page: number): void {
    this.page = page;
    this.getArticleCommentList(this.id);
    this.window.scrollTo({top: this.commentScrollTop, left: 0, behavior: 'smooth'});
  }

  // 关闭模态框
  handleCancel(): void {
    this.isVisible = false;
    this.imgCodeText = '';
  }

  // 模态框确定
  handleOk(): void {
    const data = this.formData;
    if (!this.imgCodeText || this.imgCodeText.match(/^\s*$/)) {
      this.message.error('验证码不能为空');
      return;
    }
    const params = {
      relationId: this.id,
      ...data.value,
      isMain: data.index >= 0 ? false : true,
      imgCode: this.imgCodeText.toUpperCase()
    };
    if (data.index >= 0) {
      if (data.parentNum >= 0) {
        params.commentId = this.commentList[data.parentNum]._id;
        params.beCommenter = this.commentList[data.parentNum].reply[data.index].commenter._id;
      } else {
        params.commentId = this.commentList[data.index]._id;
        params.beCommenter = this.commentList[data.index].commenter._id;
      }
    } else {
      params.commentId = '';
      params.beCommenter = '';
    }
    this.httpRequestService.addCommentRequest(params).subscribe(res => {
      const { code, msg } = res;
      if (code === 0) {
        this.message.success(msg);
        this.comment.cancelSubmit();
        this.getArticleCommentList(this.id);
        this.handleCancel();
      } else {
        this.message.error(msg);
        this.getNewImgCode();
      }
    });
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

  ngAfterViewInit() {
    this.commentScrollTop = this.commentTitle.nativeElement.offsetTop;
  }

}
