import { Component, OnInit } from '@angular/core';

import { SendValueService } from '../send-value.service';


@Component({
  selector: 'app-unsubscribe-poc',
  templateUrl: './unsubscribe-poc.component.html',
  styleUrls: ['./unsubscribe-poc.component.scss']
})
export class UnsubscribePocComponent implements OnInit {

  showComponents = true;

  constructor(private service: SendValueService) { }

  ngOnInit() {
  }

  emitValue(value: string) {

    this.service.emitValue(value);
  }

  destroyComponents() {
    this.showComponents = !this.showComponents;
  }

}
