import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
    providedIn: 'root'
})

export class AdminGuard implements CanActivate {
    // Add your code here
    constructor(
        private userStoreService: UserStoreService,
        private router: Router
      ) {}
    
      canActivate(): boolean | UrlTree {
        const isAdmin = this.userStoreService.isAdmin;
        if (isAdmin) {
          return true;
          console.log('admin');
        } else {
          return this.router.parseUrl('/courses');
          console.log('not admin');
        }
      }
}
