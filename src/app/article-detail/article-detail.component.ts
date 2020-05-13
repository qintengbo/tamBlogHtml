import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';
import { Article } from 'class/article/Article';
import { CommentBoxComponent } from 'elements/commentBox/comment-box.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.less']
})
export class ArticleDetailComponent implements OnInit, AfterViewInit {
  id: string; // 文章id
  preId: string; // 上一篇文章id
  nxtId: string; // 下一篇文章id
  articleInfo: Article;
  commentList = []; // 评论列表
  page = 1;
	size = 10;
	childSize = 3; // 子评论每页条数
  total = 0; // 全部评论条数
  mainTotal = 0; // 主评论条数
	moreComment = false;
	comment: any;

  @ViewChildren(CommentBoxComponent)
  private comments: QueryList<CommentBoxComponent>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private httpRequestService: HttpRequestService,
    private message: NzMessageService
  ) { }

  // 获取文章详情
  getArticleInfo(id: string): void {
    this.httpRequestService.articleInfoRequest(id).subscribe(res => {
      const { code, data, msg } = res;
      if (code === 0) {
        this.articleInfo = data.articleData;
        this.preId = data.preId;
        this.nxtId = data.nxtId;
        this.titleService.setTitle(`覃腾波的个人博客 - ${data.articleData.title}`);
      } else {
        this.message.error(msg);
      }
    });
  }

  // 获取文章评论
  getArticleCommentList(id: string): void {
    const params = {
      page: this.page,
      size: this.size,
      relationId: id
    };
    this.httpRequestService.articleCommentListRequest(params).subscribe(res => {
      const { code, data, msg } = res;
      if (code === 0) {
				data.list = data.list.map((item: any) => {
					item.isClick = false;
					if (item.reply.length > 0) {
						item.reply = item.reply.map((childItem: any) => {
							childItem.isClick = false;
							childItem.content = `<span class="highLightName">@${childItem.beCommenter.name}</span>，${childItem.content}`;
							return childItem;
						});
					}
					return item;
				});
				this.commentList = this.commentList.concat(data.list);
        this.total = data.total;
        this.mainTotal = data.mainTotal;
        if (this.page < Math.ceil(this.mainTotal / this.size)) {
          this.moreComment = true;
        } else {
          this.moreComment = false;
        }
      } else {
        this.message.error(msg);
      }
    });
  }

  // 返回文章列表
  goToList(): void {
    this.router.navigate(['/articleList']);
  }

  // 跳转到上一篇或下一篇
  goToOtherArticle(id: string): void {
		this.commentList = [];
		this.mainTotal = 0;
		this.total = 0;
    this.router.navigate(['/articleDetail', id]);
  }

  // 发送
  submitForm = (obj: any) => {
		let ref = null;
		const { index, parentNum, imgCode, value } = obj;
    const params = {
      relationId: this.id,
      ...value,
      isMain: index >= 0 ? false : true,
      imgCode
    };
    if (index >= 0) {
			[, ref] = this.comment;
      if (parentNum >= 0) {
        params.commentId = this.commentList[parentNum]._id;
        params.aimsId = this.commentList[parentNum].reply[index]._id;
        params.beCommenter = this.commentList[parentNum].reply[index].commenter._id;
      } else {
        params.commentId = this.commentList[index]._id;
        params.aimsId = this.commentList[index]._id;
        params.beCommenter = this.commentList[index].commenter._id;
      }
    } else {
			[ref] = this.comment;
      params.commentId = '';
      params.beCommenter = '';
      params.aimsId = '';
    }
    this.httpRequestService.addCommentRequest(params).subscribe(res => {
      const { code, msg } = res;
      if (code === 0) {
				let { data } = res;
				data = {
					isClick: false,
					...data
				};
				this.message.success(msg);
        ref.resetForm();
				ref.handleCancel();
				setTimeout(() => {
					if (index >= 0) {
						const order = parentNum >= 0 ? parentNum : index;
						const childPage = this.commentList[order].childPage;
						const len = this.commentList[order].reply.length;
						this.replyFn({ index, parentNum });
						this.loadMoreChildComment(childPage, params.commentId, order, true, len);
					} else {
						this.commentList.unshift(data); // 首部添加新评论
						this.total += 1;
						this.mainTotal += 1;
						if (this.page < Math.ceil(this.mainTotal / this.size)) {
							this.commentList.pop(); // 尾部删除一个评论
							this.moreComment = true;
						}
					}
				}, 0);
      } else {
				this.message.error(msg);
				ref.getNewImgCode();
      }
    });
	}

  // 点击回复按钮
  reply(data: any, e?: any, parent?: any, num?: number ): void {
    if (e) { e.preventDefault(); }
    data.isClick = !data.isClick;
    if (data.isMain) {
			// 子评论的评论框不显示
      data.reply.forEach((item: { isClick: boolean; }) => {
        item.isClick = false;
			});
			// 同级主评论及它们的所有子评论的评论框都不显示
			this.commentList.forEach((item: any) => {
				if (item._id !== data._id) {
					item.isClick = false;
					if (item.reply.length > 0) {
						item.reply.forEach((childItem: { isClick: boolean }) => {
							childItem.isClick = false;
						});
					}
				}
			});
    } else {
			parent.isClick = false;
			// 同级的子评论的评论框都不显示
      parent.reply.forEach((item: { isClick: boolean; }, index: number) => {
        if (index !== num) {
          item.isClick = false;
        }
			});
			// 父级的同级主评论及它们的子评论的评论框都不显示
			this.commentList.forEach((item: any) => {
				if (item._id !== parent._id) {
					item.isClick = false;
					if (item.reply.length > 0) {
						item.reply.forEach((childItem: { isClick: boolean }) => {
							childItem.isClick = false;
						});
					}
				}
			});
    }
	}
	
	replyFn(params: any) {
		const { index, parentNum } = params;
		if (parentNum > 0) {
			this.reply(this.commentList[parentNum].reply[index], undefined, this.commentList[parentNum], index);
		} else if (parentNum === 0) {
			this.reply(this.commentList[parentNum].reply[index], undefined, this.commentList[parentNum].reply[index], index);
		} else {
			this.reply(this.commentList[index]);
		}
	}

  // 查看更多主评论
  loadMoreComment(): void {
		this.page += 1;
		this.getArticleCommentList(this.id);
	}
	
	// 加载更多子评论
	loadMoreChildComment(childPage: number, id: string, num: number, isAll?: boolean, skipNum?: number): void {
		const params = {
			childPage: childPage + 1, 
			id, 
			isAll, 
			skipNum,
			size: this.childSize
		};
		this.httpRequestService.loadMoreChildCommentRequest(params).subscribe(res => {
			const { code, msg } = res;
			let { data } = res;
			if (code === 0) {
				data = data.map((item: any) => {
					item.isClick = false;
					item.content = `<span class="highLightName">@${item.beCommenter.name}</span>，${item.content}`;
					return item;
				});
				this.commentList = this.commentList.map((item, index) => {
					if (index === num) {
						item = {
							...item,
							reply: item.reply.concat(data),
							childPage: childPage + 1,
							replyTotal: isAll ? item.replyTotal + 1 : item.replyTotal
						};
						return item;
					}
					return item;
				});
			} else {
				this.message.error(msg);
			}
		});
	}

  trackById(_index: number, item: { _id: string }): string {
    return item._id;
	}

	// 获取页面上评论框的集合
	filterComments() {
    setTimeout(() => { 
			this.comment = this.comments.map(p => p); 
		}, 0);
  }
	
	ngAfterViewInit() {
		this.filterComments();
		this.comments.changes.subscribe(r => { 
			this.filterComments(); 
		});
	}

  ngOnInit() {
    this.articleInfo = {
      _id: '',
      title: '',
      coverImg: '',
      content: '',
      updateDate: '',
      lead: '',
      readNum: 0,
      classification: {},
      tag: [],
      status: 1,
      createDate: ''
    };
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getArticleInfo(this.id);
      this.getArticleCommentList(this.id);
    });
  }

}
