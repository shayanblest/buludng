import { ChangeDetectorRef, Inject, Injectable, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const BACK_DROP_CLASS = "modal-backdrop";
const SHOW_CLASS = "show";


@Injectable({
  providedIn: 'root'
})
export class BngModalService {

  private openedModals: any = [];
  private interval: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    // private cRef: ChangeDetectorRef
  ) { }

  openModal(modalTemplate: TemplateRef<any>): void {
    const embeddedView = modalTemplate.createEmbeddedView({});
    let modal = embeddedView.rootNodes[0] as HTMLElement;
    let backdrop = this.document.createElement('div') as HTMLDivElement;
    backdrop.classList.add(BACK_DROP_CLASS);
    backdrop.classList.add("fade");
    this.openedModals.push(modal);
    // node.style.zIndex = this.openedModals.length * 100 + '';
    this.document.body.appendChild(backdrop);
    this.document.body.appendChild(modal);
    setTimeout(() => {
      if (modal.classList.contains('modal'))
        modal.classList.add(SHOW_CLASS);
      else {
        const mdl = modal.getElementsByClassName('modal')[0] as HTMLElement;
        if (mdl)
          mdl.classList.add(SHOW_CLASS);
      }
      backdrop.classList.add(SHOW_CLASS);
    }, 50);
    this.interval = setInterval(() => {
      embeddedView.detectChanges();
    }, 50)
  }

  closeModal(): void {
    const openedModalsLength = this.openedModals.length;
    const lastModal = this.openedModals[openedModalsLength - 1] as HTMLElement;
    if (openedModalsLength > 0) {
      if (lastModal.classList.contains('modal'))
        lastModal.classList.remove(SHOW_CLASS);
      else {
        const mdl = lastModal.getElementsByClassName('modal')[0] as HTMLElement;
        if (mdl)
          mdl.classList.remove(SHOW_CLASS);
      }
      lastModal.classList.remove(SHOW_CLASS);
      const backDrop = this.document.getElementsByClassName(BACK_DROP_CLASS)[0];
      if (backDrop)
        backDrop.classList.remove(SHOW_CLASS);
      setTimeout(() => {
        this.document.body.removeChild(lastModal);
        if (backDrop)
          this.document.body.removeChild(backDrop);
        this.openedModals.pop();
      }, 300);

    }
    clearInterval(this.interval);

  }
}
