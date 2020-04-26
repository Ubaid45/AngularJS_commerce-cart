import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModalDialogComponent } from 'shared/components/modal/modal.component';

@Injectable()
export class ModalService {
    constructor(private ngbModal: NgbModal,
                private componentFactoryResolver: ComponentFactoryResolver) {}

  public displayDataInModal(headerText, content) {
    this.showDefaultModalComponent(DefaultModalDialogComponent, headerText, content);
  }
  showDefaultModalComponent(theComponent: any, headerText: any, bodyText: any) {
    this.componentFactoryResolver.resolveComponentFactory(theComponent);
    const modalRef = this.ngbModal.open(theComponent);
    modalRef.componentInstance.bodyText = bodyText;
    modalRef.componentInstance.headerText = headerText;
    return modalRef;
  }

  showFeaturedDialog(theComponent: any, heading: any, subheading: any) {
    const componenetFactory = this.componentFactoryResolver.resolveComponentFactory(theComponent);
    const modalRef = this.ngbModal.open(theComponent);
    return modalRef;
  }


}
