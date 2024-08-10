import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@app/auth/services/auth.service';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';

const TOKEN = 'SESSION_TOKEN';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    // Add your code here
    constructor(
      private authService: AuthService,
      private sessionStorageService: SessionStorageService,
       private router: Router
      ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.sessionStorageService.getToken();
      if (token) {
        request = request.clone({
          headers: request.headers.set('Authorization', `${token}`)
        });
      }
  
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    }
}
