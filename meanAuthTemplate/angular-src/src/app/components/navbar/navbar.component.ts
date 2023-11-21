import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
//import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    //private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    /*
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success', timeout: 3000
    }); */ // ALDER NOTE: Replace this with modal if it works for login.compenent
    this.router.navigate(['/login']);
    return false;
  }
}
