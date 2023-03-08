import { SendValueService } from './../send-value.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-poc',
  template: `
    <app-poc-base [name]="name"
      [value]="value" styleClass="bg-danger">
    </app-poc-base>
  `
})
export class PocComponent implements OnInit, OnDestroy {

  name = 'Componente sem unsubscribe';
  value!: string;

  constructor(private service: SendValueService) { }

  ngOnInit() {
    this.service.getValue()
      .pipe(tap(v => console.log(this.name, v)))
      .subscribe(newValue => this.value = newValue);
  }

  ngOnDestroy() {
    console.log(`${this.name} foi destruido`);
  }

}