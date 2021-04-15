import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';


export interface AuthResponseData {
    kind: string;
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private autoLogoutTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCowVz5HRBLT4Vjug0u8fKpNFiKE25q6CM',
            {
                email,
                password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    };

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCowVz5HRBLT4Vjug0u8fKpNFiKE25q6CM',
            {
                email,
                password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        )
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData');
        if (this.autoLogoutTimer) {
            clearTimeout(this.autoLogoutTimer)
        }
        this.autoLogoutTimer = null;
    }

    autoLogout(expirationDuraton: number) {
        this.autoLogoutTimer = setTimeout(() => this.logout(), expirationDuraton);
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuraton = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationDuraton)
        }
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMsg = 'An unexpected error occurred!'
        if (!error.error || !error.error.error) {
            return throwError(errorMsg)
        };

        switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'This email does not exist'
                break;
            case 'INVALID_PASSWORD':
                errorMsg = 'Incorrect password';
                break;
        }
        return throwError(errorMsg)
    }
}