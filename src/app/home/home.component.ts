import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  bannerArr: Array<any> = [
    {
      class: 'bg1',
      title: 'Hello World',
      subtitle: 'Welcome to Tam Blog'
    },
    {
      class: 'bg2',
      title: '2',
      subtitle: 'gsdgfsdfsdf'
    },
    {
      class: 'bg3',
      title: '3',
      subtitle: 'fsdfsdfgfdgdf'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
