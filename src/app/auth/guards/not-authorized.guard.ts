import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthorized$
      .pipe(
        map(isAuthorized => {
          if (!isAuthorized) {
            return true;
          } else {
            return this.router.parseUrl('/courses');
          }
        })
      );
  }
}