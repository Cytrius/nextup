import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

declare var document: any;
declare var $: any;

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private http: HttpClient) {}

    public timeNow = Observable.interval(1000)
        .map(x => new Date())
        .share();

    public register: any = {
        first_name: null,
        last_name: null,
    };

    public staff: any[] = [
        /*
        { first_name: 'Mark', last_name: 'Otto', time_in: new Date() },
        { first_name: 'Jacob', last_name: 'Thornton', time_in: new Date() },
        { first_name: 'Larry', last_name: 'the Bird', time_in: new Date() },
        */
    ];

    public engaged: any[] = [];

    public modalKeyPress($event) {
        if ($event.keyCode === 13 && this.register.last_name.length && this.register.first_name.length) {
            this.registerMember();
        }
    }

    public getNextUpName() {
        return this.staff[0];
    }

    public engageNext() {
        let next = this.staff.splice(0, 1)[0];
        next.engaged_at = new Date();
        this.engaged.unshift(next);
        this.http.put('/api/staff', next, httpOptions).subscribe(res => {});
    }

    public skip() {
        let skip = this.staff.splice(0, 1)[0];
        skip.engaged_at = null;
        skip.time_in = new Date();
        this.staff.push(skip);
        this.http.put('/api/staff', skip, httpOptions).subscribe(res => {});
        return;
    }

    public addStaff(member?: any, index?: number) {
        if (typeof member !== 'undefined') {
            this.engaged.splice(index, 1);
            member.engaged_at = null;
            member.time_in = new Date();
            this.staff.push(member);
            this.http.put('/api/staff', member, httpOptions).subscribe(res => {});
            return;
        }

        console.log($('#staffModal'));

        $('#staffModal').modal();
    }

    public registerMember() {
        $('#staffModal').modal('hide');
        let member = this.register;
        member.time_in = new Date();
        this.staff.push(member);
        this.register = { first_name: null, last_name: null };

        this.http.post('/api/staff', member, httpOptions).subscribe(res => {});
    }

    public getTimeSince(date: Date) {
        // get total seconds between the times
        const now = new Date();
        let delta = Math.abs(now.getTime() - date.getTime()) / 1000;

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

        return new Date(now.getFullYear(), now.getMonth(), days, hours, minutes, seconds);
    }

    public removeStaff(index: number) {
        this.staff.splice(index, 1);
    }

    public logout($event) {
        $event.preventDefault();
        document.getElementById('logout-form').submit();
    }

    ngOnInit() {
        setTimeout(() => {
            $('#staffModal').on('shown.bs.modal', function() {
                $('[name="first_name"]').focus();
            });
        });
        this.http.get<any[]>('/api/staff').subscribe(res => {
            for (let member of res) {
                if (member.is_available) {
                    this.staff.push({
                        first_name: member.first_name,
                        last_name: member.last_name,
                        time_in: new Date(member.created_at),
                    });
                } else {
                    this.engaged.push({
                        first_name: member.first_name,
                        last_name: member.last_name,
                        engaged_at: new Date(member.updated_at),
                    });
                }
            }
        });
    }
}
