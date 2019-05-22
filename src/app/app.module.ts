import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  NzLayoutModule,
  NzCarouselModule,
  NzMessageModule,
  NzGridModule,
  NzDividerModule,
  NzMenuModule,
  NzIconModule,
  NZ_I18N,
  zh_CN
} from 'ng-zorro-antd';
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
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
