import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpRequestService } from 'services/httpRequest.service';
import { Article } from 'class/article/Article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.less']
})
export class ArticleListComponent implements OnInit {
  imgUrl = '';
  articleList: Array<Article> = []; // 文章列表
  classificationList: Array<any> = []; // 分类列表
  total = 0;
  params = { // 筛选列表请求参数
    keyWord: '',
    classification: null,
    page: 1,
    size: 10
  };

  constructor(
    private httpRequestService: HttpRequestService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  // 获取页头背景图
  getImgUrl(): void {
    this.httpRequestService.bannerListRequest().subscribe(res => {
      const { code, data, msg } = res;
      if (code === 0) {
        this.imgUrl = data.list[1].imgUrl;
      } else {
        this.message.error(msg);
      }
    });
  }

  // 获取文章列表
  getArticleList(): void {
    this.httpRequestService.articleListRequest(this.params).subscribe(res => {
      const { code, data, msg } = res;
      if (code === 0) {
        this.articleList = data.list;
        this.total = data.total;
      } else {
        this.message.error(msg);
      }
    });
  }

  // 获取分类列表
  getClassificationList(): void {
    this.httpRequestService.classificationListRequest().subscribe(res => {
      const { code, data, msg } = res;
      if (code === 0) {
        this.classificationList = data.list;
      } else {
        this.message.error(msg);
      }
    });
  }

  // 切换分类
  changeClassification(id: string | null): void {
    this.router.navigate(['/articleList', { classification: id }]);
  }

  // 分页
  pageChange(num: number): void {
    this.params.page = num;
    this.router.navigate(['/articleList', { page: num }]);
  }

  trackById(index: number, item: { _id: string }): string {
    return item._id;
  }

  ngOnInit() {
    this.getImgUrl();
    this.getClassificationList();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.params.page = Number(params.get('page')) || 1;
      this.params.classification = params.get('classification') || null;
      this.getArticleList();
    });
  }

}
