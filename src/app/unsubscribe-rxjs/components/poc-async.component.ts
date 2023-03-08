import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SendValueService } from './../send-value.service';

@Component({
  selector: 'app-poc-async',
  template: `
    <app-poc-base [name]="name"
      [value]="value$ | async" styleClass="bg-success">
    </app-poc-base>
  `
})
export class PocAsyncComponent implements OnInit, OnDestroy {

  name = 'Componente com async';
  value$!: Observable<any>;

  constructor(private service: SendValueService) { }

  ngOnInit() {
    this.value$ = this.service.getValue()
      .pipe(tap(v => console.log(this.name, v)));
  }

  ngOnDestroy() {
    console.log(`${this.name} foi destruido`);
  }

}