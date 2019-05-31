import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';
import { Article } from 'class/article/Article';

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
  commentForm: FormGroup;
  isShow = false;

  constructor(
    private fb: FormBuilder,
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

  // 返回文章列表
  goToList(): void {
    this.router.navigate(['/articleList']);
  }

  // 跳转到上一篇或下一篇
  goToOtherArticle(id: string): void {
    this.router.navigate(['/articleDetail', id]);
  }

  // 评论框获得焦点
  commentInputFocus(): void {
    this.isShow = true;
  }

  // 评论框失去焦点
  commentInputBlur(): void {
    const { content } = this.commentForm.value;
    if (!content) {
      this.cancelSubmit();
    }
    this.isShow = false;
  }

  // 取消发送
  cancelSubmit(): void {
    this.commentForm.reset();
    for (const i of Object.keys(this.commentForm.controls)) {
      this.commentForm.controls[i].markAsPristine();
      this.commentForm.controls[i].updateValueAndValidity();
    }
  }

  // 发送
  submitForm = (validateForm: any) => {
    for (const i of Object.keys(this.commentForm.controls)) {
      this.commentForm.controls[i].markAsDirty();
      this.commentForm.controls[i].updateValueAndValidity();
    }
    console.log(this.commentForm.value.content);
  }

  // 评论内容自定义验证器
  contentValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value.match(/^\s*$/)) {
      return { empty: true, error: true };
    }
    return {};
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
    // 初始化评论表单
    this.commentForm = this.fb.group({
      content: [ null, [ this.contentValidator ] ],
      name: [ null, [ Validators.required ] ],
      email: [ null, [ Validators.required, Validators.email ] ],
      avatar: [ null, [ Validators.pattern(/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/) ] ]
    });
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getArticleInfo(this.id);
    });
  }

}
