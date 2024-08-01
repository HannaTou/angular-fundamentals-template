import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) {}

    getUser(): Observable<any> {
        // Add your code here
//        this.http.get(this.getUserUrl()).forEach((item) => console.log(item));
        return this.http.get(this.getUserUrl());

    }

    private getUserUrl(): string {
        // Add your code here
        return 'http://localhost:4000/users/me';
    }
}
