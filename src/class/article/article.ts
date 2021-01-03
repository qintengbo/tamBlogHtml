// 文章类
export interface Article {
  _id: string;
  content: string;
  lead: string;
  title: string;
  classification: any;
  tag: any[];
  status: number;
  readNum: number;
  createDate: string;
  updateDate: string;
  coverImg: string;
}
