import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
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

  // 返回文章列表
  goToList(): void {
    this.router.navigate(['/articleList']);
  }

  // 跳转到上一篇或下一篇
  goToOtherArticle(id: string): void {
    this.router.navigate(['/articleDetail', id]);
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
    });
  }

}
