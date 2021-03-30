import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  gameClock: number = 0;
  gameIntervalId;
  @Output() eventEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  startGame() {
    this.gameIntervalId = setInterval(() => {
      this.gameClock++;
      this.eventEmitter.emit(this.gameClock)
    }, 1000)
  }

  stopGame() {
    clearInterval(this.gameIntervalId);
  }
}
