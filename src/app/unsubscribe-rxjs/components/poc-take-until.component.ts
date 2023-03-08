import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { SendValueService } from './../send-value.service';

@Component({
    selector: 'app-poc-take-until',
    template: `
    <app-poc-base [name]="name"
      [value]="value" styleClass="bg-primary">
    </app-poc-base>
  `
})
export class PocTakeUntilComponent implements OnInit, OnDestroy {

    name = 'Componente com takeUntil';
    value!: string;

    unsub$ = new Subject();

    constructor(private service: SendValueService) { }

    ngOnInit() {
        this.service.getValue()
            .pipe(
                tap(v => console.log(this.name, v)),
                takeUntil(this.unsub$)
            )
            .subscribe(newValue => this.value = newValue);
    }

    ngOnDestroy() {
        this.unsub$.next(0);
        this.unsub$.complete();
        console.log(`${this.name} foi destruido`);
    }
}