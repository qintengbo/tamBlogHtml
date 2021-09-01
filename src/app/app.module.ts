import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgDompurifyDomSanitizer } from '@tinkoff/ng-dompurify';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { MarkdownModule } from 'ngx-markdown';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WINDOW_PROVIDERS } from 'services/window.service';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NoopAnimationsModule,
    NzLayoutModule,
    NzCarouselModule,
    NzMessageModule,
    NzGridModule,
    NzDividerModule,
    NzMenuModule,
    NzIconModule,
    MarkdownModule.forRoot(), // 导入ngx-markdown插件
    AppRoutingModule
  ],
  providers: [
		{ provide: NZ_I18N, useValue: zh_CN },
		{ provide: DomSanitizer, useClass: NgDompurifyDomSanitizer },
		WINDOW_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
