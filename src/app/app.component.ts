import { Component } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(
    private iconService: NzIconService
  ) {
    // 引入iconfont.cn上的自定义图标
    this.iconService.fetchFromIconfont({
      scriptUrl: '//at.alicdn.com/t/font_578343_h8jjpv6bmec.js'
    });
  }

  title = 'tamBlogHtml';
}
