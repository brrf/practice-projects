import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice3',
  templateUrl: './practice3.component.html',
  styleUrls: ['./practice3.component.css']
})
export class Practice3Component implements OnInit {
  detailsDisplayed: boolean = true;
  buttonLog: number[] = []

  toggleDetails(): void {
    this.detailsDisplayed = !this.detailsDisplayed;
    this.buttonLog.push(Date.now())
  }

  constructor() { }

  ngOnInit(): void {
  }

}
