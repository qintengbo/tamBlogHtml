import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  bannerArr: Array<any> = [
    {
      imgUrl: '../../assets/images/slide01.jpg',
      title: 'Hello World',
      subtitle: 'Welcome to Tam Blog'
    },
    {
      imgUrl: '../../assets/images/slide02.jpg',
      title: '2',
      subtitle: 'gsdgfsdfsdf'
    },
    {
      imgUrl: '../../assets/images/slide03.jpg',
      title: '3',
      subtitle: 'fsdfsdfgfdgdf'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
