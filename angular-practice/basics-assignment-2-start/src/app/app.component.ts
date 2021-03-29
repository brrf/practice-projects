import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = '';

  isButtonDisabled (): boolean {
    return this.username === '';
  }

  handleClick(): void {
    this.username = ''
  }
}
