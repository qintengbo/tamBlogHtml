import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { CommentBoxComponent } from './comment-box.component';

@Injectable()
export class CommentBoxService {
  constructor() { }

  showAsElement(ref: any) {
    const commentEl: NgElement & WithProperties<CommentBoxComponent> = document.createElement('comment-element') as any;
    console.log(ref);
    ref.appendChild(commentEl);
  }
}
