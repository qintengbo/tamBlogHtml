import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';
import { Article } from 'class/article/Article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  bannerArr: Array<any> = []; // 轮播图列表
  articleList: Array<any> = []; // 文章列表
  articleNew: Article;

  constructor(
    private httpRequestService: HttpRequestService,
    private message: NzMessageService
  ) { }

  // 获取轮播图列表
  getBannerList(): void {
    this.httpRequestService.bannerListRequest().subscribe(res => {
      const { code, data, msg } = res;
      if (code === 0) {
        this.bannerArr = data.list;
      } else {
        this.message.error(msg);
      }
    });
  }

  // 获取最新文章列表
  getArticleList(): void {
    this.httpRequestService.articleListRequest({ page: 1, size: 5 }).subscribe(res => {
      const { code, data, msg } = res;
      if (code === 0) {
        this.articleNew = data.list[0];
        this.articleList = data.list.splice(1, 5);
      } else {
        this.message.error(msg);
      }
    });
  }

  trackById(index: number, item: { _id: string }): string {
    return item._id;
  }

  ngOnInit() {
    this.articleNew = {
      _id: '',
      title: '',
      coverImg: '',
      content: '',
      updateDate: '',
      lead: '',
      readNum: 0,
      classification: { name: '' },
      tag: [],
      status: 1,
      createDate: ''
    };
    this.getBannerList();
    this.getArticleList();
  }

}
