import { Injectable, Inject } from '@angular/core';
//import { WINDOW } from '../../app.module';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: 'root'
})

export class SessionStorageService {

//  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string){
    // Add your code here
    window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(){
    // Add your code here
    return window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(){
    // Add your code here
    window.sessionStorage.removeItem(TOKEN);
  }
}
