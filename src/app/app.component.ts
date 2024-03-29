import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import * as platform from 'platform';
import * as CryptoJs from 'crypto-js';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from 'services/window.service';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isNavFixed: Boolean = true; // 导航栏显示状态
  activeIndex = ''; // 当前路由

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private iconService: NzIconService,
    private httpRequestService: HttpRequestService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) {
    // 引入iconfont.cn上的自定义图标
    this.iconService.fetchFromIconfont({
      scriptUrl: '//at.alicdn.com/t/font_578343_lq72k5nd6m.js'
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (this.document.body.clientHeight > offset && !this.activeIndex) {
      this.isNavFixed = false;
    } else {
      this.isNavFixed = true;
    }
  }

  ngOnInit() {
    const routeSource = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .pipe(map(() => this.activatedRoute))
    .pipe(map(route => {
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route;
    }));

    // 根据路由动态设置页面title
    routeSource.pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap((route: { data: any; }) => route.data))
      .subscribe((event: { [x: string]: string; }) => this.titleService.setTitle(`覃腾波的个人博客 - ${event['title']}`));

    // 判断当前页面路由和滚动条位置决定是否显示导航栏
    routeSource.pipe(map(route => route.parent.url))
    .subscribe(event => {
      // 路由跳转后保持页面在顶部位置
      this.window.scrollTo(0, 0);
      this.activeIndex = event['value'][0].path;
      if (!event['value'][0].path && this.document.body.scrollTop < this.document.body.clientHeight) {
        this.isNavFixed = false;
      }
    });

    /**
     * 访客埋点
     */
    const { name, os: { family } } = platform;
    const { AES } = CryptoJs;
    // 加密数据
    const cipherText = AES.encrypt(JSON.stringify({ browser: name, os: family }), 'tamBlog').toString();
    this.httpRequestService.setVistorsBuriedPointRequest({ t: cipherText }).subscribe(() => {});
  }
}
