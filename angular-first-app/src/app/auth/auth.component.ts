import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    errorMsg: string = null;

    constructor(private authService: AuthService, private router: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return
        }
        this.isLoading = true;
        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password)
        } else {
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe(
            resData => {
                console.log(resData)
                this.isLoading = false;
                this.router.navigate(['/recipes'])
            }, 
            errorMsg => {
                this.errorMsg = errorMsg
                this.isLoading = false;
            }
        );
        form.reset()
    }
}