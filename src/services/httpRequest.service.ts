import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Response } from 'class/common/response';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  path: string; // 拦截器
  httpOptions = { // http请求配置
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private message: NzMessageService
  ) {
    console.log(environment);
    this.path = environment['path'];
  }

  // 轮播图列表
  bannerListRequest(): Observable<Response> {
    return this.http.get<Response>(`${this.path}/bannerList`).pipe(
      catchError(this.handleError<any>('bannerListRequest'))
    );
  }

  /**
   * 处理失败的http操作
   * @param result - 观察结果，可选值
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // 打印错误信息
      console.error(error);
      // 打印error.message
      this.message.create('error', `${operation} failed: ${error.status + ' ' + error.statusText}`);
      // 通过返回空结果让应用继续运行
      return of(result as T);
    };
  }
}
