import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

declare var document: any;
declare var $: any;
declare var moment: any;
declare var StripeCheckout: any;
declare var Chart: any;

const httpUrl = '';

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

    public isShowingStats: boolean = false;

    public isSlave: boolean = false;

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
        this.http.put(httpUrl + '/api/staff', next, httpOptions).subscribe(res => {});
    }

    public skip() {
        let skip = this.staff.splice(0, 1)[0];
        skip.engaged_at = null;
        skip.time_in = new Date();
        this.staff.push(skip);
        this.http.put(httpUrl + '/api/staff', skip, httpOptions).subscribe(res => {});
        return;
    }

    public addStaff(member?: any, index?: number) {
        if (typeof member !== 'undefined') {
            this.engaged.splice(index, 1);
            member.engaged_at = null;
            member.time_in = new Date();
            this.staff.push(member);
            this.http.put(httpUrl + '/api/staff', member, httpOptions).subscribe(res => {});
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

        let localDate = moment().toISOString(true);
        this.http.post(httpUrl + '/api/staff?currentTime=' + localDate, member, httpOptions).subscribe(res => {});
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
        let removed = this.staff.splice(index, 1)[0];
        this.http.post(httpUrl + '/api/staff/delete', removed, httpOptions).subscribe(res => {});
    }

    public logout($event) {
        $event.preventDefault();
        document.getElementById('logout-form').submit();
    }

    public loadData() {
        let localDate = moment().toISOString(true);
        this.http.get<any[]>(httpUrl + '/api/staff?currentTime=' + localDate).subscribe(res => {
            this.staff = [];
            this.engaged = [];
            for (let member of res) {
                if (member.is_available) {
                    this.staff.push({
                        first_name: member.first_name,
                        last_name: member.last_name,
                        time_in: new Date(member.updated_at),
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

    public checkMasterSlave() {
        this.http.get<any[]>(httpUrl + '/api/checkMasterSlave').subscribe(res => {
            console.log('checkMasterSlave', res);
            this.isSlave = !res['master'];
            if (this.isSlave) {
                setInterval(() => {
                    this.loadData();
                }, 5000);
            }
        });
    }

    public ping() {
        this.http.get<any[]>(httpUrl + '/api/ping').subscribe(res => {});
    }

    ngOnInit() {
        setTimeout(() => {
            $('#staffModal').on('shown.bs.modal', function() {
                $('[name="first_name"]').focus();
            });
        });
        setInterval(() => {
            this.ping();
        }, 60000);
        this.loadData();
        this.checkMasterSlave();
        this.setupStripe();
        this.loadStats();
    }

    public showStats() {
        this.isShowingStats = true;
        this.loadStats();
    }
    public showStaff() {
        this.isShowingStats = false;
    }

    public loadStats(): void {
        this.http.get<any[]>(httpUrl + '/api/getStaffPerDay').subscribe(res => {
            console.log('getStaffPerDay', res);
        });
        this.http.get<any[]>(httpUrl + '/api/getCustomersByHour').subscribe(res => {
            setTimeout(() => {
                this.renderChart1(res);
            });
        });
        this.http.get<any[]>(httpUrl + '/api/getCustomersByMonth').subscribe(res => {
            setTimeout(() => {
                this.renderChart2(res);
            });
        });
        this.http.get<any[]>(httpUrl + '/api/getCustomersByStaff').subscribe(res => {
            setTimeout(() => {
                this.renderChart3(res);
            });
        });
    }

    private renderChart1(data) {
        console.log('getCustomersByHour', data);
        let hours = {};
        for (let i = 0; i <= 23; i++) {
            hours[i] = 0;
        }
        for (let hour of data) {
            hours[hour.hour] = Number(hour.avg);
        }
        console.log('hours', hours);
        const labels = [];
        for (let label of Object.keys(hours)) {
            if (Number(label) < 12) labels.push(label + ':00 AM');
            if (Number(label) > 12) labels.push(Number(label) - 12 + ':00 PM');
        }
        const hourAvg = [];
        for (let hour of Object.keys(hours)) {
            hourAvg.push(hours[hour]);
        }
        if (document.getElementById('averageCustomersPerHour')) {
            const ctx = document.getElementById('averageCustomersPerHour').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: hourAvg,
                        },
                    ],
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                },
                            },
                        ],
                    },
                },
            });
        }
    }

    private renderChart2(data) {
        console.log('totalCustomersPerDay', data);

        let today = new Date();
        let todayDate = today.getDate();
        const labels = [];
        for (let i = 0; i <= 30; i++) {
            let day = new Date();
            day.setDate(day.getDate() - i);
            labels.push(day.getMonth() + 1 + '/' + day.getDate());
        }
        labels.reverse();

        const dayTotals = [];

        for (let day of labels) {
            let date = data.find(d => d.label === day);
            dayTotals.push(date ? date.count : 0);
        }

        if (document.getElementById('totalCustomersPerDay')) {
            const ctx = document.getElementById('totalCustomersPerDay').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: dayTotals,
                        },
                    ],
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                },
                            },
                        ],
                    },
                },
            });
        }
    }

    private renderChart3(data) {
        console.log('getCustomersByStaff', data);
        const labels = [];
        const dataAvg = [];
        for (let avg of data) {
            labels.push(avg.staff.first_name + ' ' + avg.staff.last_name);
            dataAvg.push(Number(avg.avg));
        }
        if (document.getElementById('averageCustomersPerStaff')) {
            const ctx = document.getElementById('averageCustomersPerStaff').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: dataAvg,
                        },
                    ],
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                },
                            },
                        ],
                    },
                },
            });
        }
    }

    public handler: any;

    public setupStripe() {
        this.handler = StripeCheckout.configure({
            key: 'pk_test_38rDpRO9EAsL3ltDPW3V1jlf',
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: 'auto',
            token: function(token) {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
            },
        });
        document.getElementById('customButton').addEventListener('click', e => {
            // Open Checkout with further options:
            this.handler.open({
                name: 'NextUp',
                description: '2 widgets',
                currency: 'cad',
                amount: 2000,
            });
            e.preventDefault();
        });
        // Close Checkout on page navigation:
        window.addEventListener('popstate', () => {
            this.handler.close();
        });
    }
}
