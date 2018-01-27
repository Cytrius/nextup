import { Pipe, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { AsyncPipe } from '@angular/common';

@Pipe({
  name: 'timeSince',
  pure: false,
})
export class TimeSincePipe extends AsyncPipe {
  value: Date;
  timer: Observable<string>;

  constructor(ref: ChangeDetectorRef) {
    super(ref);
  }

  transform(obj: any): any {
    if (obj instanceof Date) {
      this.value = obj;

      if (!this.timer) {
        this.timer = this.getObservable();
      }

      return super.transform(this.timer);
    }

    return super.transform(obj);
  }

  private getObservable() {
    return Observable.interval(1000)
      .startWith(0)
      .map(() => {
        // current time
        let now = new Date();

        // time since message was sent in seconds
        let delta = (now.getTime() - this.value.getTime()) / 1000;

        // calculate (and subtract) whole days
        const days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        const minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        const seconds = delta % 60; // in theory the modulus is not required

        return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + Math.round(seconds)).slice(-2);
      });
  }
}
