import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID, Injectable } from '@angular/core';

// 创建一个新的注入令牌，用于将window注入组件。
export const WINDOW = new InjectionToken('WindowToken');

// 定义抽象类以获取对全局window对象的引用。
export abstract class WindowRef {
  get nativeWindow(): Window | Object {
    throw new Error('Not implemented.');
  }
}

// 定义实现抽象类的类并返回本机window对象。
@Injectable()
export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }
  get nativeWindow(): Window | Object {
    return window;
  }
}

// 创建一个返回本机窗口对象的工厂函数。
export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: Object): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  return new Object();
}

// 为使用BrowserWindowRef类的WindowRef标记创建可注入的提供程序。
export const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef
};

// 创建一个注入式提供程序，该提供程序使用windowFactory函数返回本机窗口对象。
export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [ WindowRef, PLATFORM_ID ]
};

// 创建一个提供者数组。
export const WINDOW_PROVIDERS = [
  browserWindowProvider,
  windowProvider
];
