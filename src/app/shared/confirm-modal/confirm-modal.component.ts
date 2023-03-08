import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title!: string;
  @Input() message!: string;
  @Input() cancelBtn = 'Não';
  @Input() confirmBtn = 'Sim';

  confirmResult!: Subject<boolean>;

  constructor(private BsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onConfirm() {
    this.confirmOrClose(true);
  }

  onClose() {
    this.confirmOrClose(false);
  }

  private confirmOrClose(value: boolean) {
    this.confirmResult.next(value);
    this.BsModalRef.hide();
  }

}
