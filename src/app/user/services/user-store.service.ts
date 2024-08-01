import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';
@Injectable({
    providedIn: 'root'
})

export class UserStoreService {
    private name$$ = new BehaviorSubject<string>('');
    public name$ = this.name$$.asObservable();
  
    private isAdmin$$ = new BehaviorSubject<boolean>(true);
    public isAdmin$ = this.isAdmin$$.asObservable();

    constructor(private userService: UserService) {}

    getUser(): Observable<any> {
        // Add your code here
        return this.userService.getUser().pipe(
            tap((response: any) => {
                    const userDetails = response.result;
                    console.log(userDetails.role);
                    this.name$$.next(userDetails.name);
                    this.isAdmin$$.next(userDetails.role === "admin");
            })
          );
        }

    get name() {
         return this.name$$.getValue();
    }

    get isAdmin() {
        // Add your code here. Get isAdmin$$ value
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        // Add your code here. Change isAdmin$$ value
        this.isAdmin$$.next(value);
    }
}
