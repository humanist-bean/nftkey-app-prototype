import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private authService:AuthService, private router:Router){

  }

  canActivate() {
    //ALDER NOTE: 401 UNAUTHORIZED ERROR, TEST HERE
    console.log("The value of authService.loggedIn() in authGuard is: ", this.authService.loggedIn());
    if(this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}