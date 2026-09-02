import { __decorate } from "tslib";
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentRegistrationLists } from './student-registration-lists/student-registration-lists';
let App = class App {
    title = signal('angular-ssr');
};
App = __decorate([
    Component({
        selector: 'app-root',
        standalone: true,
        imports: [RouterOutlet, StudentRegistrationLists],
        templateUrl: './app.html',
        styleUrl: './app.scss'
    })
], App);
export { App };
