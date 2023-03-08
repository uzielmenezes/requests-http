import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER, 3000);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showConfirm(title: string, message: string, cancelBtn?: string, confirmBtn?: string) {
    const BsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    BsModalRef.content.title = title;
    BsModalRef.content.message = message;
    if (cancelBtn) {
      BsModalRef.content.cancelBtn = cancelBtn;
    }
    if (confirmBtn) {
      BsModalRef.content.confirmBtn = confirmBtn;
    }
    return (<ConfirmModalComponent>BsModalRef.content).confirmResult;
  }
}
