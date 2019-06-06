import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { CommentBoxComponent } from './comment-box.component';

@Injectable()
export class CommentBoxService {
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  createComponent() {
    // const comment = document.createElement('comment-component');

    // // Create the component and wire it up with the element
    // const factory = this.componentFactoryResolver.resolveComponentFactory(CommentBoxComponent);
    // const commentComponentRef = factory.create(this.injector, [], comment);

    // // Attach to the view so that the change detector knows to run
    // this.applicationRef.attachView(commentComponentRef.hostView);

    // return { comment, commentComponentRef };

    const commentEl = document.createElement('comment-element') as NgElement & WithProperties<CommentBoxComponent>;
    return { commentEl };
  }

  addComponent(ref: any) {
    const { commentEl } = this.createComponent();
    ref.appendChild(commentEl);
  }

  removeComponent(ref: any) {
    const { commentEl } = this.createComponent();
    ref.removeChild(commentEl);
    // this.applicationRef.detachView(commentComponentRef.hostView);
  }
}
