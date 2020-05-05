import { Component, OnInit, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpRequestService } from 'services/httpRequest.service';
import { NzMessageService } from 'ng-zorro-antd';
import EmojiLib from 'assets/emojis';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.less']
})

export class CommentBoxComponent implements OnInit {
  commentForm: FormGroup; // 评论表单
  isShow = false;
  isVisible = false; // 模态框
  imgCodeSrc = ''; // 验证码svg
  imgCodeText = ''; // 验证码
  emojiArr = []; // emoji库
  tabNum = 1;

  constructor(
    private fb: FormBuilder,
    private httpRequestService: HttpRequestService,
    private message: NzMessageService
  ) {
    this.emojiArr = EmojiLib[this.tabNum];
  }

  @Input() index: number;
	@Input() parentNum: number;

  @Output()
	submitForm = new EventEmitter();
	@Output()
	reply = new EventEmitter();
	
	@ViewChild('imgCodeInput') imgCodeInput: ElementRef;

  // 评论框获得焦点
  commentInputFocus(): void {
    this.isShow = true;
  }

  // 发送
  submit = (e: any, validateForm: any) => {
		e.preventDefault();
    for (const i of Object.keys(this.commentForm.controls)) {
      this.commentForm.controls[i].markAsDirty();
      this.commentForm.controls[i].updateValueAndValidity();
    }
    if (validateForm.valid) {
			this.isVisible = true;
			// 验证码输入框自动获取焦点
			setTimeout(() => {
				this.imgCodeInput.nativeElement.focus();
			}, 500);
      this.imgCodeSrc = `${this.httpRequestService.getImgCode()}?${Math.random()}`;
    }
  }

  // 取消发送
  cancelSubmit(): void {
    this.resetForm();
		if (this.index >= 0) {
			this.reply.emit({
				index: this.index,
				parentNum: this.parentNum
			});
		}
	}
	
	// 重置表单
	resetForm() {
		this.commentForm.reset();
    for (const i of Object.keys(this.commentForm.controls)) {
      this.commentForm.controls[i].markAsPristine();
      this.commentForm.controls[i].updateValueAndValidity();
    }
		this.isShow = false;
	}

  // 自定义验证器
  validator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value || control.value.match(/^\s*$/)) {
      return { error: true, required: true };
    }
    return {};
  }

  // 更新验证码
  getNewImgCode = (): void => {
    this.imgCodeText = '';
    this.imgCodeSrc = `${this.httpRequestService.getImgCode()}?${Math.random()}`;
  }

  // 关闭模态框
  handleCancel = (): void => {
    this.isVisible = false;
    this.imgCodeText = '';
  }

  // 模态框确定
  handleOk(e?: KeyboardEvent): void {
    if (!this.imgCodeText || this.imgCodeText.match(/^\s*$/)) {
      this.message.error('验证码不能为空');
      return;
    }
    this.submitForm.emit({
      value: this.commentForm.value,
      index: this.index,
      parentNum: this.parentNum,
      imgCode: this.imgCodeText.toUpperCase()
    });
  }

  // 点击emoji翻页按钮
  emojiTabChange = (tabNum: number): void => {
    this.tabNum = tabNum;
    this.emojiArr = EmojiLib[this.tabNum];
  }

  // 点击emoji
  emojiClick = (item: string): void => {
    const textValue = this.commentForm.value['content'];
    if (textValue === null) {
      this.commentForm.patchValue({
        content: item
      });
      return;
    }
    this.commentForm.patchValue({
      content: textValue + item
    });
  }

  ngOnInit() {
    // 初始化评论表单
    this.commentForm = this.fb.group({
      content: [ '', [ this.validator ] ],
      name: [ null, [ this.validator ] ],
      email: [ null, [ Validators.required, Validators.email ] ],
      avatar: [ '', [ Validators.pattern(/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/) ] ]
    });
  }
}
