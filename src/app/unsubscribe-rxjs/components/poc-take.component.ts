import { SendValueService } from './../send-value.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, take } from 'rxjs/operators';

@Component({
    selector: 'app-poc-take',
    template: `
    <app-poc-base [name]="name"
      [value]="value" styleClass="bg-info">
    </app-poc-base>
  `
})
export class PocTakeComponent implements OnInit, OnDestroy {

    name = 'Componente com take';
    value!: string;

    constructor(private service: SendValueService) { }

    ngOnInit() {
        this.service.getValue()
            .pipe(
                tap(v => console.log(this.name, v)),
                take(1)
            )
            .subscribe(newValue => this.value = newValue);
    }

    ngOnDestroy() {
        console.log(`${this.name} foi destruido`);
    }
}