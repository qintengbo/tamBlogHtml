import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from 'services/window.service';

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
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) {
    // 引入iconfont.cn上的自定义图标
    this.iconService.fetchFromIconfont({
      scriptUrl: '//at.alicdn.com/t/font_578343_2m9eyl84uhf.js'
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
      this.activeIndex = event['value'][0].path;
      if (!event['value'][0].path && this.document.body.scrollTop < this.document.body.clientHeight) {
        this.isNavFixed = false;
      }
    });
  }
}
