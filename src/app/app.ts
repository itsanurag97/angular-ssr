import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpCacheComponent } from './http-cache-component/http-cache-component';
import { StudentRegistrationLists } from './student-registration-lists/student-registration-lists';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudentRegistrationLists],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-ssr');
}
