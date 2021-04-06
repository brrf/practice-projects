import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reactive-form-practice',
  templateUrl: './reactive-form-practice.component.html',
  styleUrls: ['./reactive-form-practice.component.css']
})
export class ReactiveFormPracticeComponent implements OnInit {
  reactiveForm: FormGroup
  defaultStatus = ''
  statusOptions = ['Stable', 'Critical', 'Finished']

  constructor() { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      'project': new FormControl(null, Validators.required, this.projectValidation),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Critical')
    })
  }

  projectValidation(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'first') {
          resolve({'projectForbidden': true})
        } else {
          resolve(null);
        }
      }, 2000)
    })
    return promise;
  }

}
