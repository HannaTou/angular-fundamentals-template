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
          console.log('admin');
          return true;
        } else {
          console.log('not admin');
          return this.router.parseUrl('/courses');
        }
      }
}
