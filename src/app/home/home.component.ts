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
      title: '1',
      subtitle: ''
    },
    {
      class: 'bg2',
      title: '2',
      subtitle: ''
    },
    {
      class: 'bg3',
      title: '3',
      subtitle: ''
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
