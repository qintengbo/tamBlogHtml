import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { CommentBoxComponent } from './comment-box.component';

@Injectable()
export class CommentBoxService {
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  addComponent(ref: any) {
    const comment = document.createElement('comment-component');

    // Create the component and wire it up with the element
    const factory = this.componentFactoryResolver.resolveComponentFactory(CommentBoxComponent);
    const commentComponentRef = factory.create(this.injector, [], comment);

    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(commentComponentRef.hostView);

    // add the DOM
    ref.appendChild(comment);
  }
}
