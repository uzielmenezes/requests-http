import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendValueService {

  private emiter$ = new Subject<string>();

  emitValue(value: string) {
    this.emiter$.next(value);
  }

  getValue() {
    return this.emiter$.asObservable();
  }

}
