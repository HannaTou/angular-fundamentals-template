import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Router } from '@angular/router';
import { User } from '../../user/user.module';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(
        private http: HttpClient,
        private sessionStorageService: SessionStorageService,
        private userStoreService: UserStoreService,
        private router: Router,
      ) {}

    login(email: string, password: string): Observable<any> { // replace 'any' with the required interface
        // Add your code here
        return this.http.post<{result: string}>(this.getLoginUrl(), {'email': email, 'password': password}).pipe(
            tap(response => {
              this.sessionStorageService.setToken(response.result);
              this.isAuthorized$$.next(true);
              this.router.navigate(['/courses']);
            })
          );
    }

    logout(): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `${this.sessionStorageService.getToken()}`
      });  
      return this.http.delete(this.getLogoutUrl(), { headers }).pipe(
        tap(() => {
          this.sessionStorageService.deleteToken();
          this.isAuthorized$$.next(false);
          this.router.navigate(['/login']);
        })
      );
    }

    register(name: string, email: string, password: string): Observable<any> { // replace 'any' with the required interface
      // Add your code here
      return this.http.post(this.getRegisterUrl(), {'name': name, 'email': email, 'password': password}).pipe(
        tap(() => {
          this.router.navigate(['/login']);
        })
      );
    }

    get isAuthorised() {
        // Add your code here. Get isAuthorized$$ value
        return this.isAuthorized$$.getValue();
    }

    set isAuthorised(value: boolean) {
        // Add your code here. Change isAuthorized$$ value
        this.isAuthorized$$.next(value);
    }

    getToken() {
        return this.sessionStorageService.getToken();
      }

    private getLoginUrl(): string {
        // Add your code here
        return 'http://localhost:4000/login';
    }

    private getRegisterUrl(): string {
      // Add your code here
      return 'http://localhost:4000/register';
    }

    private getLogoutUrl(): string {
      // Add your code here
      return 'http://localhost:4000/logout';
  }
}
