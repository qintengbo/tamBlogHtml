import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.less']
})

export class CommentBoxComponent implements OnInit {
  commentForm: FormGroup; // 评论表单
  isShow = false;

  constructor(
    private fb: FormBuilder
  ) { }

  @Output()
  submitForm = new EventEmitter();

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
      this.submitForm.emit(validateForm.value);
    }
  }

  // 取消发送
  cancelSubmit(): void {
    this.commentForm.reset();
    for (const i of Object.keys(this.commentForm.controls)) {
      this.commentForm.controls[i].markAsPristine();
      this.commentForm.controls[i].updateValueAndValidity();
    }
    this.isShow = false;
  }

  // 自定义验证器
  validator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value.match(/^\s*$/)) {
      return { empty: true, error: true };
    }
    return {};
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
