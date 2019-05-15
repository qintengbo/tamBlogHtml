import { Component, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private iconService: NzIconService
  ) {
    // 引入iconfont.cn上的自定义图标
    this.iconService.fetchFromIconfont({
      scriptUrl: '//at.alicdn.com/t/font_578343_h8jjpv6bmec.js'
    });
  }

  ngOnInit() {
    // 根据路由动态设置页面title
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap((route: { data: any; }) => route.data))
      .subscribe((event: { [x: string]: string; }) => this.titleService.setTitle(`覃腾波的个人博客 - ${event['title']}`));
  }
}
