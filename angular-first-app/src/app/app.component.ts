import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-first-app';
  activeHeaderNav = 'recipes';

  handleHeaderNav(header: string) {
    this.activeHeaderNav = header;
  }
}
