import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logged-out',
  imports: [],
  templateUrl: './logged-out.html',
  styleUrl: './logged-out.css'
})
export class LoggedOut {
  protected auth = inject(AuthService)
  signIn() {
    this.auth.loginWithRedirect()
  }
}
