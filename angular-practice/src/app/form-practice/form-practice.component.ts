import { Component, OnInit } from '@angular/core';
import { NgForm } from 'basics-assignment-2-start/node_modules/@angular/forms/forms';

@Component({
  selector: 'app-form-practice',
  templateUrl: './form-practice.component.html',
  styleUrls: ['./form-practice.component.css']
})
export class FormPracticeComponent implements OnInit {
  defaultSubscription = 'basic';
  formData: {}
  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(form: NgForm) {
    this.formData = form.value
  }

}
