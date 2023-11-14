import {Component} from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoggedIn = true;

  toggleTemplate = () => {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
