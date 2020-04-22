import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser;

  constructor(private auth: AuthService) {
    auth.appUser$
      .subscribe(appUser => this.appUser = appUser); // Subscribing here to avoid using the async pipe in the html template that causes infinite loop
  }

  logout() {
    this.auth.logout();
  }
}
