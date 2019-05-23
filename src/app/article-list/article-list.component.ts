import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.less']
})
export class ArticleListComponent implements OnInit {
  imgUrl = '';
  articleList: Array<any> = []; // 文章列表
  total: number;
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
        this.total = data.total;
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
      } else {
        this.message.error(msg);
      }
    });
  }

  ngOnInit() {
    this.getImgUrl();
    this.getArticleList();
  }

}
