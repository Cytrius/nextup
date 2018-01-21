import { Component } from '@angular/core';

declare var document: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'app';

    public logout($event) {
        $event.preventDefault();
        document.getElementById('logout-form').submit();
    }
}
