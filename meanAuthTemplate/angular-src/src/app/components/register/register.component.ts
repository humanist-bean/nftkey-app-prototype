import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
//import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  // Alder code to avoid typescript error
  local_data: any = undefined;
  // Alder Code to add invalid registration credential errors
  error_msg: String = '';

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    //private flashMessage: FlashMessagesService
    ) { };

  ngOnInit(): void {
  };
  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      //this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      this.error_msg = 'Please fill in all fields';
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
    //this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      this.error_msg = 'Please use a valid email';
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
    this.local_data = data;
    if(this.local_data.success) {
      //this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
      this.error_msg = '';
      this.router.navigate(['/login']);
    } else {
      //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      this.error_msg = 'Something went wrong'
      this.router.navigate(['/register']);
    }
  });
  }
}