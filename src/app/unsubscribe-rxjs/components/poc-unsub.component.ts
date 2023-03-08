import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SendValueService } from './../send-value.service';

@Component({
  selector: 'app-poc-unsub',
  template: `
    <app-poc-base [name]="name"
      [value]="value" styleClass="bg-secondary">
    </app-poc-base>
  `
})
export class PocUnsubComponent implements OnInit, OnDestroy {

  name = 'Componente com unsubscribe';
  value!: string;

  sub: Subscription[] = [];

  constructor(private service: SendValueService) { }

  ngOnInit() {
    this.sub.push(this.service.getValue()
      .pipe(tap(v => console.log(this.name, v)))
      .subscribe((newValue: string) => this.value = newValue));
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
    console.log(`${this.name} foi destruido`);
  }

}