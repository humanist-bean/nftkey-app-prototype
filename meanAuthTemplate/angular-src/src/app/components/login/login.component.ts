import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
//import { FlashMessagesService } from 'flash-messages-angular';
//import { FlashMessagesService } from 'flash-messages-angular'; // outdated package 
// Fuck flash messages I'm gonna use a bootstrap modal instead
// NOTE: Alder's code is all over this page

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  //alder code
  goodLog: Boolean = false;
  badLog: Boolean = false;
  local_data: any = undefined; // helps us avoid a typescript error


  constructor(
    private authService: AuthService,
    private router: Router)
  {}

  ngOnInit(){}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
        this.local_data = data;
      
        if(this.local_data.success) {

          this.authService.storeUserData(this.local_data.token, this.local_data.user);
          // alder code below
          this.goodLog = true;
          this.router.navigate(['dashboard']);
        } else {
          // alder code below
          this.badLog = true;
          //this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['login']);
        }
    });
  }

  resetLogStuff(){
    this.goodLog=false;
    this.badLog=false;
  }

}
