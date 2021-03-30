import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = '';
  oddNumbers: number[] = []
  evenNumbers: number[] = []


  isButtonDisabled (): boolean {
    return this.username === '';
  }

  handleClick(): void {
    this.username = ''
  }

  handleGameClock(clockCount: number) {
    if (clockCount % 2 === 0) {
      this.evenNumbers.push(clockCount)
    } else {
      this.oddNumbers.push(clockCount)
    }
  }
}
