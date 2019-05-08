import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  bannerArr: Array<any> = [];

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

  trackById(index: number, item: { _id: string }): string {
    return item._id;
  }

  ngOnInit() {
    this.getBannerList();
  }

}
