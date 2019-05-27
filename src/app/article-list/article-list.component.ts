import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.less']
})
export class ArticleListComponent implements OnInit {
  imgUrl = '';
  articleList: Array<any> = []; // 文章列表
  classificationList: Array<any> = []; // 分类列表
  total = 0;
  params = { // 筛选列表请求参数
    keyWord: '',
    classification: null,
    status: 0, // 状态，2-未发布，1-已发布，0-全部
    page: 1,
    size: 10
  };

  constructor(
    private httpRequestService: HttpRequestService,
    private message: NzMessageService
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
    this.params.classification = id;
    this.getArticleList();
  }

  ngOnInit() {
    this.getImgUrl();
    this.getArticleList();
    this.getClassificationList();
  }

}
